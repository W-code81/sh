import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-5 py-12">
      <Suspense fallback={<AuthLoading />}>
        <SignUp forceRedirectUrl="/" />
      </Suspense>
    </main>
  );
}

function AuthLoading() {
  return (
    <div role="status" className="w-full max-w-md rounded-2xl border border-[#e2e0d8] bg-white p-8 text-center text-sm text-[#70766d] shadow-sm">
      Loading account setup…
    </div>
  );
}
