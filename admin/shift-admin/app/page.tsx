import { Suspense } from "react";
import Link from "next/link";
import AdminSidebar from "@/app/components/AdminSidebar";
import { requireAdmin } from "@/lib/auth/require-admin";
import connectDb from "@/lib/db/mongoose";
import Registration from "@/lib/models/registration";

export default function OverviewPage() {
  return <Suspense fallback={<DashboardLoading />}><OverviewContent /></Suspense>;
}

async function OverviewContent() {
  const admin = await requireAdmin();

  let metrics: { attendees: number; web: number; arrival: number; unpaid: number } | null = null;
  let recent: Array<{ id: string; name: string; email: string; passId: string; status: string; source: string }> = [];

  try {
    await connectDb();
    const [attendees, web, arrival, unpaid, registrations] = await Promise.all([
      Registration.countDocuments({ registrationStatus: "active" }),
      Registration.countDocuments({ registrationStatus: "active", registrationSource: "website" }),
      Registration.countDocuments({ registrationStatus: "active", registrationSource: "on_arrival" }),
      Registration.countDocuments({ registrationStatus: "active", "payment.status": { $in: ["due", "pending"] } }),
      Registration.find({ registrationStatus: "active" }).sort({ createdAt: -1 }).limit(5)
        .select("passId attendee.fullName attendee.email payment.status registrationSource createdAt").lean(),
    ]);

    metrics = { attendees, web, arrival, unpaid };

    recent = registrations.map((registration) => ({
      id: registration._id.toString(),
      name: registration.attendee.fullName,
      email: registration.attendee.email,
      passId: registration.passId,
      status: registration.payment.status,
      source: registration.registrationSource === "on_arrival" ? "On arrival" : "Website",
    }));

  } catch (error) {
    console.error("Unable to load admin overview:", error);
  }

  const cards = metrics ? [
    { label: "Active attendees", value: metrics.attendees, detail: "Current registrations" },
    { label: "Website registrations", value: metrics.web, detail: "Submitted online" },
    { label: "On arrival", value: metrics.arrival, detail: "To enter at camp" },
    { label: "Payments due", value: metrics.unpaid, detail: "Awaiting payment" },
  ] : null;

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--text)] md:grid md:grid-cols-[230px_1fr]">
      
      <AdminSidebar role={admin.role} active="overview" />

      <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">SHIFT Camp · Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Overview</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Welcome back, {admin.email}.</p>
          </div>
          <Link href="/registrations" className="inline-flex h-10 items-center rounded-lg bg-[var(--accent)] px-4 text-sm font-medium text-white hover:bg-[var(--accent-hover)]">View attendees</Link>
        </header>

        {cards ? (
          <section aria-label="Camp registration summary" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <article key={card.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(35,48,38,0.035)]">
                <p className="text-sm font-medium text-[var(--muted)]">{card.label}</p>
                <p className="mt-4 text-3xl font-semibold tracking-tight">{card.value}</p>
                <p className="mt-1 text-xs text-[var(--subtle)]">{card.detail}</p>
              </article>
            ))}
          </section>
        ) : (
          <section role="status" className="mt-8 rounded-2xl border border-[var(--warning-border)] bg-[var(--warning-bg)] p-5 text-sm leading-6 text-[var(--warning-text)]">
            Registration data could not load. Check that the admin deployment’s <code>MONGODB_URI</code> points to the correct Atlas database.
          </section>
        )}

        <section className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(35,48,38,0.035)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4 sm:px-6">
            <div><h2 className="font-semibold">Recent registrations</h2><p className="mt-1 text-xs text-[var(--subtle)]">Latest active attendees</p></div>
            <Link href="/registrations" className="text-sm font-medium text-[var(--accent)] hover:underline">All attendees →</Link>
          </div>
          {recent.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-155 text-left text-sm">
                <thead className="bg-[var(--surface-muted)] text-[11px] uppercase tracking-[0.12em] text-[var(--subtle)]"><tr><th className="px-6 py-3 font-semibold">Attendee</th><th className="px-4 py-3 font-semibold">Pass ID</th><th className="px-4 py-3 font-semibold">Source</th><th className="px-4 py-3 font-semibold">Payment</th></tr></thead>
                <tbody className="divide-y divide-[var(--border)]">{recent.map((row) => <tr key={row.id}><td className="px-6 py-4"><p className="font-medium">{row.name}</p><p className="mt-0.5 text-xs text-[var(--subtle)]">{row.email}</p></td><td className="px-4 py-4 font-mono text-xs">{row.passId}</td><td className="px-4 py-4 text-[var(--muted)]">{row.source}</td><td className="px-4 py-4 capitalize text-[var(--muted)]">{row.status}</td></tr>)}</tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center"><h3 className="text-sm font-semibold">No registrations yet</h3><p className="mt-1 text-sm text-[var(--subtle)]">New attendees will appear here after they register.</p></div>
          )}
        </section>
      </main>
    </div>
  );
}

function DashboardLoading() {
  return <main className="grid min-h-screen place-items-center bg-[var(--page)] text-sm text-[var(--muted)]" role="status">Loading camp overview…</main>;
}
