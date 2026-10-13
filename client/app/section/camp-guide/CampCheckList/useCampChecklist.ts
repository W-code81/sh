"use client";

import { useSyncExternalStore } from "react";
import {
  getChecklistSnapshot,
  getServerChecklistSnapshot,
  setChecklistItem,
  subscribeToChecklist,
} from "./checklistStore";
import { checklistCategories } from "./checklistData";

/** Shares the saved checkbox set and derived counts with the checklist UI. */
export function useCampChecklist() {
  const checkedIds = useSyncExternalStore(
    subscribeToChecklist,
    getChecklistSnapshot,
    getServerChecklistSnapshot,
  );
  const checkedItems = new Set(checkedIds);
  const totalCount = checklistCategories.reduce((total, category) => total + category.items.length, 0);

  return {
    checkedItems,
    completedCount: checkedIds.length,
    totalCount,
    toggleItem: setChecklistItem,
  };
}
