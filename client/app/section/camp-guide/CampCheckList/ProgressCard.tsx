import { Check, CircleDashed } from "lucide-react";

type ProgressCardProps = {
  completedCount: number;
  totalCount: number;
};

/** Presents the overall completion count and its accessible progress indicators. */
export default function ProgressCard({ completedCount, totalCount }: ProgressCardProps) {
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const strokeOffset = 251.2 - (251.2 * percentage) / 100;

  return (
    <section aria-labelledby="packing-progress-title" className="relative overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative flex size-28 shrink-0 items-center justify-center" role="img" aria-label={`${percentage}% packed`}>
          <svg aria-hidden="true" className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle className="fill-none text-surface-container-highest" cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
            <circle className="fill-none text-primary transition-[stroke-dashoffset] duration-500 ease-out" cx="50" cy="50" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset={strokeOffset} strokeLinecap="round" strokeWidth="8" />
          </svg>
          <div className="absolute text-center">
            <span className="block text-2xl font-bold tabular-nums text-foreground">{percentage}%</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">packed</span>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
            <div>
              <h2 id="packing-progress-title" className="text-lg font-semibold text-foreground">Your packing progress</h2>
              <p className="mt-1 text-sm text-on-surface-variant"><span className="font-semibold tabular-nums text-foreground">{completedCount} of {totalCount}</span> items checked</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 text-xs font-medium text-on-surface-variant">
              {completedCount === totalCount ? <Check aria-hidden="true" size={14} /> : <CircleDashed aria-hidden="true" size={14} />}
              {completedCount === totalCount ? "Ready to go" : completedCount === 0 ? "Just getting started" : "In progress"}
            </span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-container-highest" role="progressbar" aria-label="Packing checklist progress" aria-valuemin={0} aria-valuemax={totalCount} aria-valuenow={completedCount}>
            <div className="h-full rounded-full bg-linear-to-r from-primary-container via-primary to-tertiary transition-[width] duration-500" style={{ width: `${percentage}%` }} />
          </div>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">
            {completedCount === totalCount ? "Everything on this list is checked off." : completedCount === 0 ? "Check items off as you get ready. Your progress stays in this browser." : "Nice progress. Keep going at your own pace."}
          </p>
        </div>
      </div>
    </section>
  );
}
