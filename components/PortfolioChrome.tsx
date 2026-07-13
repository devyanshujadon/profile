"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Home uses a sticky identity rail — no top chrome.
 * Nested routes (blog, admin) get a light header + footer.
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
        <div className="mx-auto max-w-[920px] px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[1.05rem] tracking-tight text-ink hover:text-mark transition-colors"
          >
            Devyanshu Jadon
          </Link>
          <nav className="flex items-center gap-5 text-sm text-ink-2">
            <Link href="/" className="hover:text-mark transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-mark transition-colors">
              Writing
            </Link>
          </nav>
        </div>
      </header>
      <main className="px-6 sm:px-10 pt-12 pb-8">{children}</main>
      <footer className="px-6 sm:px-10 pb-10">
        <div className="mx-auto max-w-[920px] border-t border-line pt-6 flex flex-col sm:flex-row sm:justify-between gap-2">
          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} Devyanshu Jadon
          </p>
          <Link
            href="/"
            className="text-sm text-ink-3 hover:text-mark transition-colors"
          >
            Back home
          </Link>
        </div>
      </footer>
    </>
  );
}
