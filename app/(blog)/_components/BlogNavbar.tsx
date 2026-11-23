"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export default function BlogNavbar() {
  const pathname = usePathname() || "/";
  const local = pathname === "/journal" || pathname.startsWith("/journal/");
  const base = local ? "/journal" : "";
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

  const links = [
    { href: base || "/", label: "All" },
    { href: "https://devyanshu.com", label: "Portfolio" },
    { href: `${base}/feed.xml`, label: "RSS" },
  ];

  return (
    <header className="site-nav">
      <div className="shell nav-row">
        <Link href={base || "/"} className="wordmark">
          Journal
        </Link>
        <nav className="nav-desktop" aria-label="Journal">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a key={link.label} href={link.href} className="nav-quiet">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="nav-quiet">
                {link.label}
              </Link>
            ),
          )}
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
      <div id={panelId} className={open ? "nav-panel is-open" : "nav-panel"} hidden={!open}>
        <div className="shell nav-panel-inner">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <a key={link.label} href={link.href} className="nav-panel-link" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="nav-panel-link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
