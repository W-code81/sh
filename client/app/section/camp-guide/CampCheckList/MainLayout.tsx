import ChecklistCategory from "./ChecklistCategory";
import ChecklistSidebar from "./ChecklistSidebar";
import ProgressCard from "./ProgressCard";
import { checklistCategories } from "./checklistData";

type MainLayoutProps = {
  checkedItems: ReadonlySet<string>;
  completedCount: number;
  totalCount: number;
  onToggleItem: (itemId: string, checked: boolean) => void;
};

/** Arranges the checklist's progress, expandable categories, and planning sidebar. */
export default function MainLayout({
  checkedItems,
  completedCount,
  totalCount,
  onToggleItem,
}: MainLayoutProps) {
  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.8fr)] lg:gap-7">
      <div className="flex min-w-0 flex-col gap-5">

        {/* Progress Card */}
        <ProgressCard completedCount={completedCount} totalCount={totalCount} />

        {/* Check List Category cards */}
        <section aria-label="Packing checklist" className="flex flex-col gap-3">
          {checklistCategories.map((category, index) => (
            <ChecklistCategory
              key={category.id}
              category={category}
              checkedItems={checkedItems}
              onToggleItem={onToggleItem}
              initiallyOpen={index === 0}
            />
          ))}
        </section>
      </div>
      
      {/* Sidebart */}
      <ChecklistSidebar />
    </div>
  );
}
