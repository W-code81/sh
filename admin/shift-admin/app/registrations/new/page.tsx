import Link from "next/link";

export default function NewRegistrationPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-12 text-[#1d2a24] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/registrations" className="text-sm font-medium text-[#55765e] hover:text-[#315b46]">
          ← Back to registrations
        </Link>
        <section className="mt-8 rounded-2xl border border-[#e2e0d8] bg-white p-6 shadow-[0_12px_32px_rgba(35,48,38,0.04)] sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a8177]">Attendee management</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Add a registration</h1>
          <p className="mt-3 text-sm leading-6 text-[#70766d]">
            The manual registration form is not available yet. This page is ready for that workflow to be added.
          </p>
        </section>
      </div>
    </main>
  );
}
