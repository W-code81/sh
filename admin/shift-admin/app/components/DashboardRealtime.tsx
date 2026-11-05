"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ConnectionState = "connecting" | "live" | "offline" | "polling";

function listensForRegistrationChanges(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/registrations") ||
    pathname === "/payments" ||
    pathname === "/team"
  );
}

/** Keeps admin data fresh when MongoDB reports a registration or payment change. */
export default function DashboardRealtime() {
  const pathname = usePathname();
  const router = useRouter();
  const [connection, setConnection] = useState<ConnectionState>("connecting");

  useEffect(() => {
    if (!listensForRegistrationChanges(pathname)) return;

    // Next's regular dev server doesn't provide Vercel's WebSocket upgrade
    // runtime, so use a light refresh interval locally.
    if (process.env.NODE_ENV === "development") {
      const interval = setInterval(() => router.refresh(), 15_000);
      return () => clearInterval(interval);
    }

    let disposed = false;
    let reconnectDelay = 1000;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let socket: WebSocket | undefined;

    const connect = () => {
      if (disposed) return;

      // uses the same url as the current page but with the websocket protocol and the realtime api route
      const url = new URL("/api/admin/realtime", window.location.href);
      url.protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      socket = new WebSocket(url);

      // listens for changes to registration and payment data
      socket.addEventListener("open", () => {
        reconnectDelay = 1000;
        setConnection("live");
        // Catch up on changes that may have happened while the socket was down.
        router.refresh();
      });

      // if the server sends a notification that a registration has changed, it refreshes and gets latest data
      socket.addEventListener("message", (message) => {
        try {
          const event: unknown = JSON.parse(String(message.data));
          if (
            typeof event === "object" &&
            event !== null &&
            "type" in event &&
            event.type === "registration-change"
          ) {
            router.refresh();
          }
        } catch {
          // Ignore malformed events and keep the connection available.
        }
      });

      // if the connection closes, it closes the socket and attempt a reconnect with a delay that doubles each time up to 30 seconds
      socket.addEventListener("close", () => {
        if (disposed) return;
        setConnection("offline");
        reconnectTimer = setTimeout(connect, reconnectDelay);
        reconnectDelay = Math.min(reconnectDelay * 2, 30_000);
      });

      socket.addEventListener("error", () => socket?.close());
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socket?.close();
    };
  }, [pathname, router]);

  if (!listensForRegistrationChanges(pathname)) return null;

  const displayConnection = process.env.NODE_ENV === "development" ? "polling" : connection;
  const label = displayConnection === "live"
    ? "Live updates on"
    : displayConnection === "polling"
      ? "Local dashboard refreshes every 15 seconds"
    : displayConnection === "connecting"
      ? "Connecting to live updates"
      : "Reconnecting to live updates";

  return (
    <span
      aria-live="polite"
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-(--border) bg-(--surface) px-3 text-xs font-medium text-(--muted)"
      title={label}
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${displayConnection === "live" || displayConnection === "polling" ? "bg-(--accent)" : "bg-(--subtle)"}`}
      />
      {displayConnection === "live" ? "Live" : displayConnection === "polling" ? "Local refresh" : displayConnection === "connecting" ? "Connecting" : "Reconnecting"}
    </span>
  );
}
