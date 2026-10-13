"use client";

import { ChevronDown } from "lucide-react";
import type { ChecklistCategory as ChecklistCategoryData } from "./checklistData";

type ChecklistCategoryProps = {
  category: ChecklistCategoryData;
  checkedItems: ReadonlySet<string>;
  onToggleItem: (itemId: string, checked: boolean) => void;
  initiallyOpen?: boolean;
};

/** Renders one expandable group and forwards checkbox changes to the checklist store. */
export default function ChecklistCategory({ category,
  checkedItems,
  onToggleItem,
  initiallyOpen = false,
}: ChecklistCategoryProps) {
  const completedCount = category.items.filter((item) => checkedItems.has(item.id)).length;
  const percentage = Math.round((completedCount / category.items.length) * 100);
  const Icon = category.icon;

  return (
    <details className="group overflow-hidden rounded-2xl border border-outline-variant/45 bg-surface-container-lowest shadow-sm open:border-primary/35" open={initiallyOpen}>
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:p-5 [&::-webkit-details-marker]:hidden">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
          <Icon aria-hidden="true" size={19} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-foreground sm:text-base">{category.title}</span>
          <span className="mt-1 block text-xs text-on-surface-variant">{completedCount} of {category.items.length} packed</span>
        </span>
        <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-surface-container-highest sm:block">
          <span className="block h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${percentage}%` }} />
        </span>
        <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-on-surface-variant transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <ul className="space-y-1 border-t border-outline-variant/35 px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
        {category.items.map((item) => {
          const checked = checkedItems.has(item.id);
          return (
            <li key={item.id}>
              <label className="group/item flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-container-low has-focus-visible:outline-2 has-focus-visible:outline-primary">
                <input
                  checked={checked}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-primary"
                  onChange={(event) => onToggleItem(item.id, event.target.checked)}
                  type="checkbox"
                />
                <span className="min-w-0">
                  <span className={`block text-sm font-medium transition-colors ${checked ? "text-on-surface-variant line-through" : "text-foreground"}`}>{item.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-on-surface-variant">{item.note}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
