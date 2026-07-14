"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Home uses a sticky identity rail — no top chrome.
 * Nested routes get a light header + footer.
 */
export default function PortfolioChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <main className="px-6 sm:px-8 lg:px-10">{children}</main>;
  }

  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto max-w-[40rem] px-6 sm:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[1.05rem] tracking-tight text-ink hover:text-mark transition-colors"
          >
            Devyanshu Jadon
          </Link>
          <nav className="flex items-center gap-5 text-sm text-ink-2">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <a
              href="https://blog.devyanshu.com"
              className="hover:text-ink transition-colors"
            >
              Writing
            </a>
          </nav>
        </div>
      </header>
      <main className="px-6 sm:px-8 pt-12 pb-8">{children}</main>
      <footer className="px-6 sm:px-8 pb-10">
        <div className="mx-auto max-w-[40rem] border-t border-line pt-6 flex flex-col sm:flex-row sm:justify-between gap-2">
          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} Devyanshu Jadon
          </p>
          <Link
            href="/"
            className="text-sm text-ink-3 hover:text-ink transition-colors"
          >
            Back home
          </Link>
        </div>
      </footer>
    </>
  );
}
