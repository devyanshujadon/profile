"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Dark theme on, switch to light" : "Light theme on, switch to dark"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-switch"
      data-dark={isDark ? "true" : "false"}
    >
      <span className="theme-switch-icon theme-switch-sun" aria-hidden="true">
        <Sun size={13} strokeWidth={2.4} />
      </span>
      <span className="theme-switch-icon theme-switch-moon" aria-hidden="true">
        <Moon size={12} strokeWidth={2.4} />
      </span>
      <span className="theme-switch-knob" aria-hidden="true">
        {isDark ? <Moon size={14} strokeWidth={2.2} /> : <Sun size={14} strokeWidth={2.2} />}
      </span>
    </button>
  );
}
