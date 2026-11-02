import Link from "next/link";

export default function AccountPendingPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f3ee] px-5 py-12 text-[#1d2a24]">
      <section className="w-full max-w-lg rounded-2xl border border-[#e2e0d8] bg-white p-7 shadow-sm sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#55765e]">SHIFT Camp admin</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Your account isn’t linked yet</h1>
        <p className="mt-3 text-sm leading-6 text-[#70766d]">
          You’re signed in with Clerk, but this account doesn’t have an active admin record in the database used by this deployment. Ask the owner to check your Clerk user ID, email, and active status in Atlas.
        </p>
        <Link href="/sign-in" className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#315b46] px-4 text-sm font-medium text-white">Sign in again</Link>
      </section>
    </main>
  );
}
