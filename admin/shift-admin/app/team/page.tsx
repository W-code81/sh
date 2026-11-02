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
    <main className="min-h-screen bg-[#f5f3ee] text-[#1d2a24]">
      <div className="mx-auto grid min-h-screen max-w-360 md:grid-cols-[230px_1fr]">
        <AdminSidebar role="owner" active="team" />
        <section className="min-w-0 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e2e0d8] pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a8177]">SHIFT Camp</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Admin access</h1>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-[#e2e0d8] bg-white px-3 py-2">
              <span className="grid size-8 place-items-center rounded-full bg-[#e5ede5] text-xs font-semibold uppercase text-[#315b46]">
                {owner.email?.slice(0, 1) ?? "O"}
              </span>
              <div className="pr-1">
                <p className="max-w-47.5 truncate text-xs font-medium">{owner.email}</p>
                <p className="text-[11px] text-[#7a8177]">Super admin</p>
              </div>
            </div>
          </header>

          <div className="mx-auto mt-8 max-w-5xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e3d8] bg-[#eaf0e8] px-3 py-1.5 text-xs font-medium text-[#315b46]">
                  <span className="size-1.5 rounded-full bg-[#5d8a65]" />
                  Super-admin only
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">Manage admin access</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#70766d]">
                  Invite trusted people to help manage camp registrations and payments.
                  Admin invitations and access controls will be available here.
                </p>
              </div>
              <button
                type="button"
                disabled
                title="Admin invitations are not available yet"
                className="inline-flex h-11 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#315b46] px-4 text-sm font-medium text-white opacity-55"
              >
                <span aria-hidden="true" className="text-lg leading-none">+</span>
                Invite admin
              </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#e2e0d8] bg-white shadow-[0_12px_32px_rgba(35,48,38,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceae4] px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-sm font-semibold">Invited admins</h3>
                  <p className="mt-1 text-xs text-[#7a8177]">People with access to the admin workspace</p>
                </div>
                <span className="rounded-full bg-[#f2f2ed] px-2.5 py-1 text-xs font-medium text-[#656d63]">Setup in progress</span>
              </div>

              <div className="hidden grid-cols-[minmax(180px,1.5fr)_minmax(180px,1.5fr)_120px_120px] gap-4 bg-[#faf9f6] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#858a80] sm:grid">
                <span>Name</span>
                <span>Email</span>
                <span>Status</span>
                <span>Role</span>
              </div>
              <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
                <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-[#f0f3ed] text-xl text-[#55765e]">♙</span>
                <h4 className="mt-4 text-sm font-semibold">Admin list coming soon</h4>
                <p className="mt-1 max-w-sm text-sm leading-6 text-[#7a8177]">
                  Once invitations are connected, names, emails, roles, and invitation statuses will appear here.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-[#8a8f86]">
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
    <main className="grid min-h-screen place-items-center bg-[#f5f3ee] px-5 text-sm text-[#70766d]" role="status">
      Loading admin access…
    </main>
  );
}
