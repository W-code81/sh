import AdminSidebar from "@/app/components/AdminSidebar";
import { requireAdmin } from "@/lib/auth/require-admin";
import { Suspense } from "react";

export default function PaymentsPage() {
  return <Suspense fallback={<PaymentsLoading />}><PaymentsContent /></Suspense>;
}

async function PaymentsContent() {
  const admin = await requireAdmin();
  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--text)] md:grid md:grid-cols-[230px_1fr]">
      <AdminSidebar role={admin.role} active="payments" />
      <main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Finance</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Payments</h1>
        <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-12">
          <h2 className="text-lg font-semibold">Payment reporting is coming next</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Payment records will appear here once the admin reporting view is connected.</p>
        </section>
      </main>
    </div>
  );
}

function PaymentsLoading() {
  return <main className="grid min-h-screen place-items-center bg-[var(--page)] text-sm text-[var(--muted)]" role="status">Loading payments…</main>;
}
