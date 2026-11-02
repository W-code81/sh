import AdminSidebar from "@/app/components/AdminSidebar";
import { requireAdmin } from "@/lib/auth/require-admin";
import { Suspense } from "react";

export default function PaymentsPage() {
  return <Suspense fallback={<PaymentsLoading />}><PaymentsContent /></Suspense>;
}

async function PaymentsContent() {
  const admin = await requireAdmin();
  return (
    <div className="min-h-screen bg-[#f7f6f1] text-[#202b24] md:grid md:grid-cols-[230px_1fr]">
      <AdminSidebar role={admin.role} active="payments" />
      <main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#768176]">Finance</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Payments</h1>
        <section className="mt-8 rounded-2xl border border-[#e4e1d8] bg-white p-8 text-center sm:p-12">
          <h2 className="text-lg font-semibold">Payment reporting is coming next</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#73796f]">Payment records will appear here once the admin reporting view is connected.</p>
        </section>
      </main>
    </div>
  );
}

function PaymentsLoading() {
  return <main className="grid min-h-screen place-items-center bg-[#f7f6f1] text-sm text-[#70766d]" role="status">Loading payments…</main>;
}
