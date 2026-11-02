import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-5 py-12">
      <SignUp forceRedirectUrl="/" />
    </main>
  );
}
