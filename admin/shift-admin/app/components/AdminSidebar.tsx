import Link from "next/link";

type AdminSidebarProps = {
  role: "owner" | "admin";
  active: "overview" | "attendees" | "payments" | "team";
};

const items = [
  { key: "overview", label: "Overview", href: "/", mark: "⌂" },
  { key: "attendees", label: "Attendees", href: "/registrations", mark: "♙" },
  { key: "payments", label: "Payments", href: "/payments", mark: "₦" },
] as const;

export default function AdminSidebar({ role, active }: AdminSidebarProps) {
  const navItems = role === "owner"
    ? [...items, { key: "team" as const, label: "Teams", href: "/team", mark: "◎" }]
    : items;

  return (
    <aside className="border-b border-[#e4e1d8] bg-[#f0eee7] px-4 py-4 md:min-h-screen md:border-b-0 md:border-r md:px-5 md:py-7">
      <Link href="/" className="px-2 text-sm font-bold tracking-[0.15em] text-[#315b46]">
        SHIFT <span className="font-normal tracking-normal text-[#7b8077]">CAMP ADMIN</span>
      </Link>
      <p className="mb-2 mt-7 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b8d84] md:block">Workspace</p>
      <nav aria-label="Admin navigation" className="mt-5 flex gap-2 overflow-x-auto md:mt-0 md:flex-col">
        {navItems.map((item) => {
          const selected = active === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={selected ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${selected ? "bg-[#315b46] text-white" : "text-[#59645a] hover:bg-white/80 hover:text-[#26392e]"}`}
            >
              <span aria-hidden="true" className={`grid size-7 place-items-center rounded-lg text-base ${selected ? "bg-white/15" : "bg-white text-[#657266]"}`}>{item.mark}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-10 hidden rounded-xl border border-[#e1dfd7] bg-white/70 p-4 md:block">
        <p className="text-xs font-semibold text-[#315b46]">SHIFT Camp</p>
        <p className="mt-1 text-xs leading-5 text-[#73796f]">Registration and camp operations</p>
      </div>
    </aside>
  );
}
