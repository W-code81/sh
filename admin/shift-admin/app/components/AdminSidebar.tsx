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
    <aside className="border-b border-(--border) bg-(--sidebar) px-4 py-4 md:min-h-screen md:border-b-0 md:border-r md:px-5 md:py-7">
      <Link href="/" className="px-2 text-sm font-bold tracking-[0.15em] text-(--accent)">
        SHIFT <span className="font-normal tracking-normal text-(--muted)">CAMP ADMIN</span>
      </Link>
      <p className="mb-2 mt-7 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--subtle) md:block">Workspace</p>
      <nav aria-label="Admin navigation" className="mt-5 flex gap-2 overflow-x-auto md:mt-0 md:flex-col">
        {navItems.map((item) => {
          const selected = active === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={selected ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${selected ? "bg-(--accent) text-white" : "text-(--muted) hover:bg-(--surface-translucent) hover:text-foreground"}`}
            >
              <span aria-hidden="true" className={`grid size-7 place-items-center rounded-lg text-base ${selected ? "bg-white/15" : "bg-(--surface) text-(--muted)"}`}>{item.mark}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-10 hidden rounded-xl border border-(--border) bg-(--surface-translucent) p-4 md:block">
        <p className="text-xs font-semibold text-(--accent)">SHIFT Camp</p>
        <p className="mt-1 text-xs leading-5 text-(--muted)">Registration and camp operations</p>
      </div>
    </aside>
  );
}
