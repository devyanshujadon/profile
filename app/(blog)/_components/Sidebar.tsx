import Link from "next/link";
import { Rss, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface SidebarProps {
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

export default function Sidebar({ categories, tags }: SidebarProps) {
  return (
    <aside className="space-y-8 md:sticky md:top-24">
      <section>
        <h3 className="section-label mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-accent inline-block" />
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat.name}>
              <Link
                href={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                className="flex items-center justify-between px-3 py-2 bg-white brutal-border-2 text-sm font-bold text-ink hover:bg-accent hover:text-base transition-colors group"
              >
                <span className="uppercase tracking-wider">{cat.name}</span>
                <span className="mono text-xs opacity-60 group-hover:opacity-100">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="section-label mb-4 flex items-center gap-2">
          <Tag size={12} />
          Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag.name}
              className="text-[10px] font-bold text-ink bg-base-dark brutal-border-2 px-2 py-1 uppercase tracking-wider"
            >
              #{tag.name}
              <span className="ml-1 opacity-60">{tag.count}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="brutal-card p-5 bg-accent-3">
        <h3 className="section-label mb-3 text-ink">Subscribe</h3>
        <p className="text-sm font-display font-medium text-ink leading-snug mb-4">
          GET NEW ENTRIES DELIVERED VIA RSS.
        </p>
        <a
          href="/feed.xml"
          className="inline-flex items-center gap-2 brutal-btn bg-base"
        >
          <Rss size={14} />
          RSS Feed
        </a>
      </section>
    </aside>
  );
}
