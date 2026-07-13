"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BlogNavbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/journal";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-canvas/90 backdrop-blur-sm border-b border-line">
      <nav className="mx-auto max-w-[920px] px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[1.15rem] tracking-tight text-ink hover:text-mark transition-colors"
        >
          Journal
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={isHome ? "text-mark" : "nav-link"}
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
