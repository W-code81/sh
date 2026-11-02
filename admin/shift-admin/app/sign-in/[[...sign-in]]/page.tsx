import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-5 py-12">
      <Suspense fallback={<AuthLoading label="Loading sign in…" />}>
        <SignIn />
      </Suspense>
    </main>
  );
}

function AuthLoading({ label }: { label: string }) {
  return (
    <div role="status" className="w-full max-w-md rounded-2xl border border-[#e2e0d8] bg-white p-8 text-center text-sm text-[#70766d] shadow-sm">
      {label}
    </div>
  );
}
