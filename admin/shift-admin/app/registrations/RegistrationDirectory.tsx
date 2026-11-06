"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import DashboardRealtime from "@/app/components/DashboardRealtime";
import type {
  RegistrationDetails,
  RegistrationListItem,
  RegistrationListResponse,
} from "./types";

type SourceFilter = "all" | "website" | "on_arrival";
type StatusFilter = "all" | "active" | "cancelled";

function paymentLabel(status: RegistrationListItem["paymentStatus"]) {
  return status.replaceAll("_", " ");
}

function dateLabel(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(date);
}

function formatNaira(amountKobo: number | null) {
  if (amountKobo === null) return "Not set";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amountKobo / 100);
}

export default function RegistrationDirectory() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<SourceFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [detailsRefreshVersion, setDetailsRefreshVersion] = useState(0);
  const [data, setData] = useState<RegistrationListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [details, setDetails] = useState<RegistrationDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setRefreshVersion((version) => version + 1);
    setDetailsRefreshVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setLoadError(null);

      const params = new URLSearchParams({
        page: String(page),
        q: query,
        source,
        status,
      });

      try {
        const response = await fetch(`/api/registrations?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json() as RegistrationListResponse & { error?: string };

        if (!response.ok) throw new Error(result.error ?? "Unable to load registrations.");
        setData(result);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setLoadError(error instanceof Error ? error.message : "Unable to load registrations.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, query ? 250 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [page, query, refreshVersion, source, status]);

  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch(`/api/registrations/${selectedId}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json() as { registration?: RegistrationDetails; error?: string };

        if (!response.ok || !result.registration) {
          throw new Error(result.error ?? "Unable to load attendee details.");
        }
        setDetails(result.registration);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setDetailsError(error instanceof Error ? error.message : "Unable to load attendee details.");
      } finally {
        if (!controller.signal.aborted) setDetailsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [detailsRefreshVersion, selectedId]);

  const openDetails = (id: string) => {
    setDetails(null);
    setDetailsError(null);
    setDetailsLoading(true);
    setSelectedId(id);
  };

  const closeDetails = useCallback(() => setSelectedId(null), []);

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };

  const onSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value as SourceFilter);
    setPage(1);
  };

  const onStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as StatusFilter);
    setPage(1);
  };

  const pagination = data?.pagination;
  const firstRecord = pagination && pagination.total > 0
    ? (pagination.page - 1) * pagination.pageSize + 1
    : 0;
  const lastRecord = pagination
    ? Math.min(pagination.page * pagination.pageSize, pagination.total)
    : 0;

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Attendees</h2>
          <p className="mt-1 text-sm text-(--muted)">
            {pagination
              ? `${pagination.total} registration${pagination.total === 1 ? "" : "s"}`
              : "Search and manage camp registrations"}
          </p>
        </div>
        <DashboardRealtime onRegistrationChange={refresh} />
      </div>

      <section className="mt-5 rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-[0_8px_24px_rgba(35,48,38,0.035)] sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(16rem,1fr)_12rem_12rem]">
          <label className="block">
            <span className="sr-only">Search attendees</span>
            <span className="flex h-11 items-center gap-3 rounded-xl border border-(--border) bg-background px-3 text-(--muted) focus-within:border-(--accent)">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>
              <input
                type="search"
                value={query}
                onChange={onQueryChange}
                placeholder="Name, email, phone or Pass ID"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-(--subtle)"
              />
            </span>
          </label>

          <label className="flex h-11 items-center rounded-xl border border-(--border) bg-background px-3">
            <span className="sr-only">Filter registration source</span>
            <select value={source} onChange={onSourceChange} className="w-full bg-transparent text-sm text-foreground outline-none">
              <option value="all">All sources</option>
              <option value="website">Website</option>
              <option value="on_arrival">On arrival</option>
            </select>
          </label>

          <label className="flex h-11 items-center rounded-xl border border-(--border) bg-background px-3">
            <span className="sr-only">Filter registration status</span>
            <select value={status} onChange={onStatusChange} className="w-full bg-transparent text-sm text-foreground outline-none">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        {loadError && (
          <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-(--warning-border) bg-(--warning-bg) px-4 py-3 text-sm text-(--warning-text)">
            <p>{loadError}</p>
            <button type="button" onClick={refresh} className="font-semibold underline underline-offset-2">Try again</button>
          </div>
        )}

        {isLoading && !data ? (
          <div className="mt-5 grid gap-3" aria-label="Loading registrations" role="status">
            {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-18 animate-pulse rounded-xl bg-(--surface-muted)" />)}
          </div>
        ) : data?.registrations.length ? (
          <>
            <div className="mt-5 grid gap-3 md:hidden" aria-label="Attendee list">
              {data.registrations.map((registration) => (
                <article key={registration.id} className="rounded-xl border border-(--border) bg-background p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">{registration.name}</h3>
                      <p className="mt-1 truncate text-xs text-(--muted)">{registration.email}</p>
                      <p className="mt-2 font-mono text-xs text-(--accent)">{registration.passId}</p>
                    </div>
                    <button type="button" onClick={() => openDetails(registration.id)} aria-label={`More details for ${registration.name}`} className="grid size-10 shrink-0 place-items-center rounded-lg border border-(--border) bg-(--surface) text-(--muted) transition hover:border-(--accent) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)">
                      <MoreIcon />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-(--border) pt-3 text-xs">
                    <SourceBadge source={registration.source} />
                    <PaymentBadge status={registration.paymentStatus} />
                    <RegistrationStatusBadge status={registration.registrationStatus} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 hidden overflow-x-auto md:block">
              <table className="w-full min-w-3xl text-left text-sm">
                <thead className="bg-(--surface-muted) text-[11px] uppercase tracking-[0.12em] text-(--subtle)">
                  <tr>
                    <th scope="col" className="rounded-l-lg px-4 py-3 font-semibold">Attendee</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Pass ID</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Payment</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                    <th scope="col" className="rounded-r-lg px-4 py-3 text-right font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border)">
                  {data.registrations.map((registration) => (
                    <tr key={registration.id} className="transition-colors hover:bg-(--surface-muted)">
                      <td className="px-4 py-4">
                        <p className="font-medium">{registration.name}</p>
                        <p className="mt-0.5 text-xs text-(--subtle)">{registration.email}</p>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-(--accent)">{registration.passId}</td>
                      <td className="px-4 py-4"><SourceBadge source={registration.source} /></td>
                      <td className="px-4 py-4"><PaymentBadge status={registration.paymentStatus} /></td>
                      <td className="px-4 py-4"><RegistrationStatusBadge status={registration.registrationStatus} /></td>
                      <td className="px-4 py-4 text-right">
                        <button type="button" onClick={() => openDetails(registration.id)} aria-label={`More details for ${registration.name}`} className="ml-auto grid size-9 place-items-center rounded-lg border border-(--border) text-(--muted) transition hover:border-(--accent) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)">
                          <MoreIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : !isLoading && (
          <div className="mt-5 rounded-xl border border-dashed border-(--border) px-5 py-12 text-center">
            <span aria-hidden="true" className="mx-auto grid size-11 place-items-center rounded-xl bg-(--accent-soft) text-lg text-(--accent)">⌕</span>
            <h3 className="mt-3 text-sm font-semibold">{query || source !== "all" || status !== "all" ? "No matching attendees" : "No registrations yet"}</h3>
            <p className="mt-1 text-sm text-(--muted)">{query || source !== "all" || status !== "all" ? "Try changing your search or filters." : "New registrations will appear here as soon as they are submitted."}</p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-(--border) pt-4">
          <p className="text-xs text-(--muted)">
            {pagination ? `Showing ${firstRecord}–${lastRecord} of ${pagination.total}` : "Page size: 10 attendees"}
          </p>
          <nav aria-label="Attendee pages" className="flex items-center gap-2">
            <button type="button" disabled={!pagination || page <= 1 || isLoading} onClick={() => setPage((current) => Math.max(1, current - 1))} className="h-9 rounded-lg border border-(--border) px-3 text-sm text-(--muted) transition hover:bg-(--surface-muted) disabled:cursor-not-allowed disabled:opacity-45">Previous</button>
            <span className="min-w-20 text-center text-xs text-(--muted)">{pagination ? `${pagination.page} / ${pagination.totalPages}` : "—"}</span>
            <button type="button" disabled={!pagination || page >= pagination.totalPages || isLoading} onClick={() => setPage((current) => current + 1)} className="h-9 rounded-lg border border-(--border) px-3 text-sm text-(--muted) transition hover:bg-(--surface-muted) disabled:cursor-not-allowed disabled:opacity-45">Next</button>
          </nav>
        </div>
      </section>

      {selectedId && (
        <RegistrationDetailsModal
          details={details}
          error={detailsError}
          isLoading={detailsLoading}
          onClose={closeDetails}
        />
      )}
    </>
  );
}

function SourceBadge({ source }: { source: RegistrationListItem["source"] }) {
  return <span className="inline-flex rounded-full bg-(--accent-soft) px-2.5 py-1 text-[11px] font-medium text-(--accent)">{source === "on_arrival" ? "On arrival" : "Website"}</span>;
}

function PaymentBadge({ status }: { status: RegistrationListItem["paymentStatus"] }) {
  return <span className="inline-flex rounded-full border border-(--border) px-2.5 py-1 text-[11px] font-medium capitalize text-(--muted)">{paymentLabel(status)}</span>;
}

function RegistrationStatusBadge({ status }: { status: RegistrationListItem["registrationStatus"] }) {
  return <span className="text-xs capitalize text-(--muted)">{status}</span>;
}

function MoreIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>;
}

function RegistrationDetailsModal({
  details,
  error,
  isLoading,
  onClose,
}: {
  details: RegistrationDetails | null;
  error: string | null;
  isLoading: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6">
      <button type="button" aria-label="Close attendee details" onClick={onClose} className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]" />
      <section role="dialog" aria-modal="true" aria-labelledby="attendee-details-title" className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-(--border) bg-(--surface) p-5 text-foreground shadow-2xl sm:p-7">
        <header className="flex items-start justify-between gap-4 border-b border-(--border) pb-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--accent)">Attendee record</p>
            <h2 id="attendee-details-title" className="mt-1 truncate text-xl font-semibold">{details?.attendee.fullName ?? "Attendee details"}</h2>
            {details && <p className="mt-1 font-mono text-xs text-(--muted)">{details.passId}</p>}
          </div>
          <button autoFocus type="button" onClick={onClose} aria-label="Close details" className="grid size-9 shrink-0 place-items-center rounded-lg border border-(--border) text-(--muted) transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </header>

        {isLoading ? (
          <div className="grid gap-3 py-6" role="status"><p className="text-sm text-(--muted)">Loading attendee details…</p><div className="h-24 animate-pulse rounded-xl bg-(--surface-muted)" /><div className="h-24 animate-pulse rounded-xl bg-(--surface-muted)" /></div>
        ) : error ? (
          <div role="alert" className="mt-5 rounded-xl border border-(--warning-border) bg-(--warning-bg) px-4 py-3 text-sm text-(--warning-text)">{error}</div>
        ) : details ? (
          <div className="grid gap-4 py-5 sm:grid-cols-2">
            <DetailsGroup title="Attendee">
              <DetailLine label="Email" value={details.attendee.email} />
              <DetailLine label="Phone" value={details.attendee.phoneNumber} />
              <DetailLine label="Fellowship" value={details.attendee.fellowshipGroup} />
              <DetailLine label="Age group" value={details.attendee.ageGroup} />
            </DetailsGroup>
            <DetailsGroup title="Registration">
              <DetailLine label="Source" value={details.registrationSource === "on_arrival" ? "On arrival" : "Website"} />
              <DetailLine label="Status" value={details.registrationStatus} />
              <DetailLine label="Registered" value={dateLabel(details.createdAt)} />
              <DetailLine label="Payment method" value={details.payment.method?.replaceAll("_", " ") ?? "Not selected"} />
            </DetailsGroup>
            <DetailsGroup title="Emergency contact">
              <DetailLine label="Name" value={details.emergencyContact.name} />
              <DetailLine label="Phone" value={details.emergencyContact.phone} />
            </DetailsGroup>
            <DetailsGroup title="Payment">
              <DetailLine label="Status" value={paymentLabel(details.payment.status)} />
              <DetailLine label="Amount due" value={formatNaira(details.payment.amountDueKobo)} />
              <DetailLine label="Amount paid" value={formatNaira(details.payment.amountPaidKobo)} />
              <DetailLine label="Provider" value={details.payment.provider ?? "—"} />
              {details.payment.paidAt && <DetailLine label="Paid at" value={dateLabel(details.payment.paidAt)} />}
            </DetailsGroup>
            <DetailsGroup title="Medical or dietary request" className="sm:col-span-2">
              <p className="whitespace-pre-wrap text-sm leading-6 text-(--muted)">{details.requests.dietaryAccessibility?.trim() || "No request provided."}</p>
            </DetailsGroup>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function DetailsGroup({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return <section className={`rounded-xl border border-(--border) bg-background p-4 ${className}`}><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--subtle)">{title}</h3><div className="space-y-3">{children}</div></section>;
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 text-sm"><dt className="shrink-0 text-(--subtle)">{label}</dt><dd className="min-w-0 wrap-break-word text-right font-medium capitalize text-foreground">{value}</dd></div>;
}
