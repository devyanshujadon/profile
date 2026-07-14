import Link from "next/link";

interface SidebarProps {
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

export default function Sidebar({ categories, tags }: SidebarProps) {
  return (
    <aside className="space-y-10 lg:sticky lg:top-24">
      <section>
        <h3 className="label mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                className="flex justify-between text-sm text-ink-2 hover:text-ink transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-ink-3 font-mono text-xs">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {tags.length > 0 && (
        <section>
          <h3 className="label mb-4">Tags</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {tags.map((tag) => (
              <span key={tag.name} className="text-sm text-ink-3">
                {tag.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="label mb-3">Subscribe</h3>
        <a
          href="/feed.xml"
          className="text-sm text-mark hover:text-ink transition-colors"
        >
          RSS feed
        </a>
      </section>
    </aside>
  );
}
