import { auth } from "@clerk/nextjs/server";
import { upgradeWebSocket } from "@vercel/functions";
import AdminUser from "@/lib/models/adminUser";
import Registration from "@/lib/models/registration";
import connectDb from "@/lib/db/mongoose";

/** Streams sanitized registration-change notifications to signed-in admins. */
export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  let isSameOrigin = false;

  // Prevent another site from opening a socket with an admin's session cookie.
  try {
    isSameOrigin = Boolean(origin && host && new URL(origin).host === host);
  } catch {
    isSameOrigin = false;
  }

  if (!isSameOrigin) {
    return new Response("Forbidden", { status: 403 });
  }

  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    await connectDb();
    const activeAdmin = await AdminUser.exists({
      authProviderUserId: userId,
      active: true,
    });

    if (!activeAdmin) return new Response("Forbidden", { status: 403 });
  } catch (error) {
    console.error("Admin realtime authentication failed:", error);
    return new Response("Realtime service unavailable", { status: 503 });
  }

  return upgradeWebSocket((socket) => {
    let closed = false;
    let changeStream: ReturnType<typeof Registration.watch> | undefined;

    const cleanup = () => {
      if (closed) return;
      closed = true;
      if (changeStream) void changeStream.close().catch(() => undefined);
    };

    socket.on("close", cleanup);
    socket.on("error", cleanup);

    try {
      changeStream = Registration.watch([], { maxAwaitTimeMS: 1000 });
      changeStream.on("change", () => {
        if (closed || socket.readyState !== socket.OPEN) return;

        // The dashboard refetches its own authorized data; no attendee details
        // are sent over the WebSocket.
        socket.send(JSON.stringify({ type: "registration-change" }));
      });
      changeStream.on("error", (error) => {
        console.error("Admin registration change stream failed:", error);
        if (socket.readyState === socket.OPEN) socket.close(1011, "Stream unavailable");
        cleanup();
      });

      socket.send(JSON.stringify({ type: "ready" }));
    } catch (error) {
      console.error("Could not start admin registration change stream:", error);
      if (socket.readyState === socket.OPEN) socket.close(1011, "Stream unavailable");
      cleanup();
    }
  });
}
