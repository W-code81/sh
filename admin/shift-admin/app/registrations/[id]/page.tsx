import { Suspense } from "react";
import Link from "next/link";

export default function RegistrationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<RegistrationDetailsFallback />}>
      <RegistrationDetails params={params} />
    </Suspense>
  );
}

async function RegistrationDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[var(--page)] px-5 py-12 text-[var(--text)] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/registrations" className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent)]">
          ← Back to registrations
        </Link>
        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_12px_32px_rgba(35,48,38,0.04)] sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Registration record</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Attendee details</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Registration details are not available yet.
          </p>
          <p className="mt-5 break-all rounded-lg bg-[var(--page)] px-3 py-2 font-mono text-xs text-[var(--muted)]">Record: {id}</p>
        </section>
      </div>
    </main>
  );
}

function RegistrationDetailsFallback() {
  return (
    <main className="min-h-screen bg-[var(--page)] px-5 py-12 text-[var(--text)] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)] shadow-[0_12px_32px_rgba(35,48,38,0.04)] sm:p-9" role="status">
          Loading registration details…
        </div>
      </div>
    </main>
  );
}
