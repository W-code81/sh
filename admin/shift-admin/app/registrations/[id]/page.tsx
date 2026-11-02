import Link from "next/link";

export default async function RegistrationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-5 py-12 text-[#1d2a24] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/registrations" className="text-sm font-medium text-[#55765e] hover:text-[#315b46]">
          ← Back to registrations
        </Link>
        <section className="mt-8 rounded-2xl border border-[#e2e0d8] bg-white p-6 shadow-[0_12px_32px_rgba(35,48,38,0.04)] sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a8177]">Registration record</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Attendee details</h1>
          <p className="mt-3 text-sm leading-6 text-[#70766d]">
            Registration details are not available yet.
          </p>
          <p className="mt-5 break-all rounded-lg bg-[#f5f3ee] px-3 py-2 font-mono text-xs text-[#70766d]">Record: {id}</p>
        </section>
      </div>
    </main>
  );
}
