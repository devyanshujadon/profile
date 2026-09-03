import Link from "next/link";

interface SidebarProps {
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

export default function Sidebar({ categories, tags }: SidebarProps) {
  return (
    <aside className="space-y-10 lg:sticky lg:top-20">
      <section>
        <h3 className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink-3 mb-4">
          Categories
        </h3>
        <ul className="border-t border-ink">
          {categories.map((cat) => (
            <li key={cat.name} className="border-b border-ink">
              <Link
                href={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                className="flex justify-between py-2 text-sm text-ink-2 hover:text-mark transition-colors duration-150 cursor-pointer"
              >
                <span>{cat.name}</span>
                <span className="text-ink-3 font-mono text-xs">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {tags.length > 0 && (
        <section>
          <h3 className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink-3 mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className="font-mono text-[0.68rem] tracking-[0.06em] uppercase text-ink-3"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-ink-3 mb-3">
          Subscribe
        </h3>
        <a href="/feed.xml" className="nav-link">
          RSS feed
        </a>
      </section>
    </aside>
  );
}
