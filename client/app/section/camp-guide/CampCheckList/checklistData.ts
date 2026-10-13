import { BedDouble, BookOpenText, ClipboardList, Shirt, Sparkles, type LucideIcon,} from "lucide-react";

export type ChecklistItem = {
  id: string;
  label: string;
  note: string;
};

export type ChecklistCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: ChecklistItem[];
};

export const checklistCategories: ChecklistCategory[] = [
  {
    id: "clothing",
    title: "Clothing & everyday layers",
    icon: Shirt,
    items: [
      { id: "clothing-hoodie", label: "Comfortable hoodie or light jacket", note: "Choose layers that suit the expected weather." },
      { id: "clothing-shoes", label: "Comfortable closed-toe shoes", note: "Useful for walking and group activities." },
      { id: "clothing-activity", label: "Clothes for activities", note: "Pack comfortable outfits you can move around in." },
      { id: "clothing-change", label: "Enough clothes for the camp dates", note: "Camp runs from 17–20 December 2026." },
      { id: "clothing-rain", label: "Rainwear, if needed", note: "Check the forecast before you pack." },
    ],
  },
  {
    id: "personal-care",
    title: "Personal care & essentials",
    icon: Sparkles,
    items: [
      { id: "care-toiletries", label: "Toothbrush, toothpaste, and toiletries", note: "Bring the personal-care items you use each day." },
      { id: "care-towel", label: "Bath towel and washcloth", note: "Pack these if they are not provided at the venue." },
      { id: "care-bottle", label: "Reusable water bottle", note: "Label it with your name." },
      { id: "care-sun", label: "Sunscreen or insect repellent, if needed", note: "Choose what is appropriate for you and the weather." },
    ],
  },
  {
    id: "sleeping",
    title: "Sleeping & comfort",
    icon: BedDouble,
    items: [
      { id: "sleep-pillow", label: "Pillow, if needed", note: "Confirm what the venue provides before packing." },
      { id: "sleep-bedding", label: "Bedding, if requested by organizers", note: "Sleeping arrangements and supplied bedding are still to be confirmed." },
      { id: "sleep-light", label: "Small flashlight", note: "Helpful if you need extra light after dark." },
    ],
  },
  {
    id: "faith-community",
    title: "Faith & fellowship",
    icon: BookOpenText,
    items: [
      { id: "faith-bible", label: "Bible or devotional", note: "Bring the format you prefer to use." },
      { id: "faith-notebook", label: "Notebook and pen", note: "For notes, reflections, or group activities." },
      { id: "faith-name-tag", label: "Name tag or lanyard, if provided", note: "The camp team will share check-in details when confirmed." },
    ],
  },
  {
    id: "health-documents",
    title: "Health & important information",
    icon: ClipboardList,
    items: [
      { id: "health-forms", label: "Health forms or documents requested by organizers", note: "Bring only the items included in the final camp instructions." },
      { id: "health-medication", label: "Personal medication and instructions", note: "Keep medication in its original packaging where possible." },
    ],
  },
];

export const checklistItemIds = checklistCategories.flatMap((category) =>
  category.items.map((item) => item.id),
);
