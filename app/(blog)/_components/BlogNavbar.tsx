"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BlogNavbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/journal";

  return (
    <header className="register">
      <Link
        href="/"
        className="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-ink hover:text-mark transition-colors duration-150 cursor-pointer"
      >
        Journal
      </Link>
      <nav className="flex items-center gap-x-4" aria-label="Journal">
        <Link href="/" className={isHome ? "nav-link text-ink" : "nav-link"}>
          All
        </Link>
        <a href="https://devyanshu.com" className="nav-link">
          Portfolio
        </a>
        <a href="/feed.xml" className="nav-link">
          RSS
        </a>
      </nav>
    </header>
  );
};

export default BlogNavbar;
