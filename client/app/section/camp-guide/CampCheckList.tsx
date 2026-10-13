"use client";

import Header from "./CampCheckList/Header";
import MainLayout from "./CampCheckList/MainLayout";
import { useCampChecklist } from "./CampCheckList/useCampChecklist";
import { markChecklistComplete, resetChecklist } from "./CampCheckList/checklistStore";

/** Connects the checklist state to the page header and the visual checklist layout. */
export default function CampCheckList() {
  const { checkedItems, completedCount, totalCount, toggleItem } = useCampChecklist();

  return (
    <main className="relative min-h-[calc(100vh-18rem)] w-full overflow-hidden px-5 pb-14 sm:px-8 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary-container/15 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-48 size-80 rounded-full bg-tertiary-container/10 blur-[110px]" />
      
      <div className="relative mx-auto max-w-7xl">
        <Header
          completedCount={completedCount}
          totalCount={totalCount}
          onMarkAll={markChecklistComplete}
          onReset={resetChecklist}
        />
        <MainLayout
          checkedItems={checkedItems}
          completedCount={completedCount}
          totalCount={totalCount}
          onToggleItem={toggleItem}
        />
      </div>
    </main>
  );
}
