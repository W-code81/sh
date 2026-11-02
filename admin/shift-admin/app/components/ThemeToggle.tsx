"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    window.localStorage.setItem("shift-admin-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className="fixed right-5 top-5 z-50 grid size-10 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] shadow-sm transition hover:bg-[var(--accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <span aria-hidden="true" className="text-lg leading-none">◐</span>
    </button>
  );
}
