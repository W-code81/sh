import Link from "next/link";

export default function RegistrationsPage() {
  return (
    <main className="min-h-screen bg-[var(--page)] px-5 py-12 text-[var(--text)] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold tracking-[0.14em] text-[var(--accent)]">
          SHIFT <span className="font-normal tracking-normal text-[var(--muted)]">CAMP ADMIN</span>
        </Link>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Attendee management</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Registrations</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Registration management is being prepared. Attendee records will appear here once the admin workflow is connected.
            </p>
          </div>
          <Link href="/registrations/new" className="inline-flex h-11 items-center rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-white">
            Add registration
          </Link>
        </div>
        <section className="mt-8 grid min-h-64 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center shadow-[0_12px_32px_rgba(35,48,38,0.04)]">
          <div>
            <span aria-hidden="true" className="mx-auto grid size-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-xl text-[var(--accent)]">♙</span>
            <h2 className="mt-4 text-sm font-semibold">No registrations to show yet</h2>
            <p className="mt-1 max-w-sm text-sm leading-6 text-[var(--muted)]">
              The attendee list will be available here when registration management is ready.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
