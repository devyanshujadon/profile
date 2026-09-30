"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const homeNav = [
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#tools", label: "Tools" },
  { href: "#contact", label: "Contact" },
];

const innerNav = [
  { href: "/", label: "Home" },
  { href: "/developers", label: "Developers" },
];

export default function PortfolioChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/blog/admin");
  const nav = isHome ? homeNav : innerNav;
  const [open, setOpen] = useState(false);

  if (isAdmin) {
    return (
      <>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="register">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href="/"
              className="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer"
            >
              DJ
            </Link>
            <span className="status-pill">Open</span>
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1" aria-label="Primary">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/developers" className="nav-link">
              Developers
            </a>
            <a href="https://blog.devyanshu.com" className="nav-highlight">
              Writing
            </a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-foot">
          <p className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-ink-3">
            © {new Date().getFullYear()} Devyanshu Jadon
          </p>
          <Link href="/" className="nav-link">
            Back home
          </Link>
        </footer>
      </>
    );
  }

  return (
    <div className="theme-dots">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="dots-nav">
        <div className="dots-nav-inner">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="dots-wordmark">
              Devyanshu
            </Link>
            <span className="hidden text-[13px] text-[#5e5e5e] lg:inline">
              Open to work
            </span>
          </div>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
            <a href="https://blog.devyanshu.com" className="pill">
              Writing
            </a>
          </nav>

          <button
            type="button"
            className="dots-menu lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <div className="dots-menu-panel lg:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="https://blog.devyanshu.com" className="pill w-fit">
              Writing
            </a>
          </div>
        ) : null}
      </header>
      <main id="main">{children}</main>
      {!isHome && (
        <footer className="dots-foot">
          <p className="text-[14px] text-[#5e5e5e]">
            © {new Date().getFullYear()} Devyanshu Jadon
          </p>
          <Link href="/" className="nav-link">
            Back home
          </Link>
        </footer>
      )}
    </div>
  );
}
