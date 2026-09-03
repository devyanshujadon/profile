"use client";

import React from "react";
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
  const nav = isHome ? homeNav : innerNav;

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
          <span className="hidden sm:inline font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
            India / Remote
          </span>
        </div>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a href="https://blog.devyanshu.com" className="nav-highlight">
            Writing
          </a>
        </nav>
      </header>
      <main id="main">{children}</main>
      {!isHome && (
        <footer className="site-foot">
          <p className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-ink-3">
            © {new Date().getFullYear()} Devyanshu Jadon
          </p>
          <Link href="/" className="nav-link">
            Back home
          </Link>
        </footer>
      )}
    </>
  );
}
