import Link from "next/link";

interface SidebarProps {
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  prefix?: string;
}

export default function Sidebar({ categories, tags, prefix = "" }: SidebarProps) {
  return (
    <aside className="journal-panel journal-side">
      <section>
        <h2 className="kicker">Categories</h2>
        <ul className="journal-cats">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link href={`${prefix}/category/${encodeURIComponent(cat.name.toLowerCase())}`}>
                <span>{cat.name}</span>
                <span>{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {tags.length > 0 && (
        <section>
          <h2 className="kicker">Tags</h2>
          <p className="journal-tags">
            {tags.map((tag) => (
              <span key={tag.name}>{tag.name}</span>
            ))}
          </p>
        </section>
      )}

      <section>
        <h2 className="kicker">Subscribe</h2>
        <a href={`${prefix}/feed.xml`} className="text-link">
          RSS feed
        </a>
      </section>
    </aside>
  );
}
