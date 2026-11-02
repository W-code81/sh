import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--page)] px-5 py-12">
      <Suspense fallback={<AuthLoading label="Loading sign in…" />}>
        <SignIn
          forceRedirectUrl="/team"
          appearance={{ variables: { colorBackground: "var(--surface)", colorForeground: "var(--text)", colorPrimary: "var(--accent)" } }}
        />
      </Suspense>
    </main>
  );
}

function AuthLoading({ label }: { label: string }) {
  return (
    <div role="status" className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)] shadow-sm">
      {label}
    </div>
  );
}
