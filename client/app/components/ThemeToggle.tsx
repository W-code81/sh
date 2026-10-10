"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    if (currentTheme === "light" || currentTheme === "dark") setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("shift-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex size-9 items-center justify-center rounded-xl border border-outline-variant/70 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-11 max-[380px]:size-8"
    >
      {theme === "dark" ? <Sun aria-hidden="true" size={19} /> : <Moon aria-hidden="true" size={19} />}
    </button>
  );
}
