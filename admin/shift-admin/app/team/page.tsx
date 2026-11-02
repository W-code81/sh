import { Suspense } from "react";
import { requireOwner } from "@/lib/auth/require-admin";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminTeamPage() {
  return (
    <Suspense fallback={<TeamLoading />}>
      <AdminTeamContent />
    </Suspense>
  );
}

async function AdminTeamContent() {
  const owner = await requireOwner();

  return (
    <main className="min-h-screen bg-[var(--page)] text-[var(--text)]">
      <div className="mx-auto grid min-h-screen max-w-360 md:grid-cols-[230px_1fr]">
        <AdminSidebar role="owner" active="team" />
        <section className="min-w-0 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">SHIFT Camp</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Admin access</h1>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <span className="grid size-8 place-items-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold uppercase text-[var(--accent)]">
                {owner.email?.slice(0, 1) ?? "O"}
              </span>
              <div className="pr-1">
                <p className="max-w-47.5 truncate text-xs font-medium">{owner.email}</p>
                <p className="text-[11px] text-[var(--muted)]">Super admin</p>
              </div>
            </div>
          </header>

          <div className="mx-auto mt-8 max-w-5xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--accent)]">
                  <span className="size-1.5 rounded-full bg-[var(--accent-muted)]" />
                  Super-admin only
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">Manage admin access</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
                  Invite trusted people to help manage camp registrations and payments.
                  Admin invitations and access controls will be available here.
                </p>
              </div>
              <button
                type="button"
                disabled
                title="Admin invitations are not available yet"
                className="inline-flex h-11 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-medium text-white opacity-55"
              >
                <span aria-hidden="true" className="text-lg leading-none">+</span>
                Invite admin
              </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_32px_rgba(35,48,38,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-sm font-semibold">Invited admins</h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">People with access to the admin workspace</p>
                </div>
                <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">Setup in progress</span>
              </div>

              <div className="hidden grid-cols-[minmax(180px,1.5fr)_minmax(180px,1.5fr)_120px_120px] gap-4 bg-[var(--surface-muted)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--subtle)] sm:grid">
                <span>Name</span>
                <span>Email</span>
                <span>Status</span>
                <span>Role</span>
              </div>
              <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
                <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-[var(--accent-soft)] text-xl text-[var(--accent)]">♙</span>
                <h4 className="mt-4 text-sm font-semibold">Admin list coming soon</h4>
                <p className="mt-1 max-w-sm text-sm leading-6 text-[var(--muted)]">
                  Once invitations are connected, names, emails, roles, and invitation statuses will appear here.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-[var(--subtle)]">
              Signed in as {owner.email}. Access is checked on the server for every visit.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function TeamLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--page)] px-5 text-sm text-[var(--muted)]" role="status">
      Loading admin access…
    </main>
  );
}
