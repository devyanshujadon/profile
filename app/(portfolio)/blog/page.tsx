import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Journal',
  description: 'Engineering logs, ideas, and field notes.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const [featured, ...rest] = posts;

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-16">
        <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
          <span className="mono text-sm text-base">07 — JOURNAL</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-6 tracking-tight">
          WRITINGS<span className="text-accent">.</span>
        </h1>
        <p className="text-lg font-display font-medium text-ink-light max-w-xl leading-relaxed">
          ENGINEERING LOGS, IDEAS, AND FIELD NOTES FROM BUILDING SOFTWARE.
        </p>
      </header>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <span
              key={category}
              className="px-3 py-1 text-xs font-bold bg-white brutal-border-2 text-ink uppercase tracking-wider"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="block group mb-12">
          <article className="brutal-card p-6 md:p-8 bg-accent-2">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="mono text-xs text-ink font-bold">FEATURED</span>
              <span className="mono text-xs text-ink-light">{featured.date}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-ink">{featured.category}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-ink leading-[1.05] group-hover:underline decoration-2 underline-offset-4">
              {featured.title}
            </h2>
            <p className="text-ink-light leading-relaxed mb-4">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-2 mono text-sm font-bold uppercase text-ink">
              Read entry <ArrowUpRight size={16} />
            </span>
          </article>
        </Link>
      )}

      <div className="space-y-10">
        {rest.map(post => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <time dateTime={post.date} className="mono text-xs text-ink-light">
                  {post.date}
                </time>
                <span className="w-1 h-1 bg-ink rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink">{post.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-ink leading-tight group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-ink-light leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-ink bg-base-dark brutal-border-2 px-2 py-1 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="brutal-card p-12 text-center">
          <p className="font-display font-bold text-2xl text-ink">NO ENTRIES YET</p>
          <p className="mono text-sm text-ink-light mt-2">Check back soon.</p>
        </div>
      )}
    </div>
  );
}
