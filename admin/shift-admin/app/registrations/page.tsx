import Link from "next/link";
import { Suspense } from "react";
import AdminSidebar from "@/app/components/AdminSidebar";
import RegistrationDirectory from "./RegistrationDirectory";
import { requireAdmin } from "@/lib/auth/require-admin";

export default function RegistrationsPage() {
  return (
    <Suspense fallback={<RegistrationsLoading />}>
      <RegistrationsContent />
    </Suspense>
  );
}

async function RegistrationsContent() {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[230px_1fr]">
      <AdminSidebar role={admin.role} active="attendees" />
      <main className="min-w-0 px-4 py-7 sm:px-7 lg:px-10 lg:py-9">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--muted)">Attendee management</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Registrations</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-(--muted)">
              Search attendees, review payment status, and open a registration when you need the full details.
            </p>
          </div>
          <Link href="/registrations/new" className="inline-flex h-10 items-center rounded-lg bg-(--accent) px-4 text-sm font-medium text-white transition hover:bg-(--accent-hover)">
            Add registration
          </Link>
        </header>

        <RegistrationDirectory />
      </main>
    </div>
  );
}

function RegistrationsLoading() {
  return <main className="grid min-h-screen place-items-center bg-background text-sm text-(--muted)" role="status">Loading attendee registrations…</main>;
}
