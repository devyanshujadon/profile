"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Rss } from "lucide-react";

const BlogNavbar = () => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base border-b-3 border-ink">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-xl tracking-tight hover:text-accent transition-colors"
        >
          JOURNAL<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className={`mono text-xs font-bold uppercase tracking-wider transition-colors hover:text-accent ${
              isActive("/") ? "text-accent" : "text-ink"
            }`}
          >
            All
          </Link>
          <a
            href="https://devyanshu.com"
            className="hidden sm:inline-flex items-center gap-1 mono text-xs font-bold uppercase tracking-wider text-ink hover:text-accent transition-colors"
          >
            Main site
            <ArrowUpRight size={12} />
          </a>
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 mono text-xs font-bold uppercase tracking-wider text-ink hover:text-accent transition-colors"
            aria-label="RSS feed"
          >
            <Rss size={14} />
            <span className="hidden sm:inline">RSS</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;
