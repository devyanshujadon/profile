"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BlogNavbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/journal";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-canvas/95 border-b border-line">
      <nav className="mx-auto max-w-[42rem] px-6 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[1.1rem] tracking-tight text-ink hover:text-mark transition-colors"
        >
          Journal
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/"
            className={isHome ? "text-ink font-medium" : "nav-link"}
          >
            All
          </Link>
          <a href="https://devyanshu.com" className="nav-link">
            Portfolio
          </a>
          <a href="/feed.xml" className="nav-link">
            RSS
          </a>
        </div>
      </nav>
    </header>
  );
};

export default BlogNavbar;
