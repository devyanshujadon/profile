"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#lab", label: "Lab" },
  { href: "/#about", label: "About" },
  { href: "/#notes", label: "Writing" },
  { href: "/blog", label: "Blog" },
  { href: "/developers", label: "Developers" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-nav">
      <div className="shell nav-row">
        <Link href="/" className="wordmark">
          Devyanshu Jadon
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-quiet">
              {link.label}
            </Link>
          ))}
          <a className="btn-email" href={`mailto:${SITE.email}`}>
            Email
          </a>
          <ThemeToggle />
        </nav>
        <div className="nav-mobile-tools">
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div
        id={panelId}
        className={open ? "nav-panel is-open" : "nav-panel"}
        hidden={!open}
      >
        <div className="shell nav-panel-inner">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-panel-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="btn-email"
            href={`mailto:${SITE.email}`}
            onClick={() => setOpen(false)}
          >
            Email
          </a>
        </div>
      </div>
    </header>
  );
}
