import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/blog";

export const revalidate = 60;

export const metadata = {
  title: "Writing",
  description: "Engineering notes and ideas.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-[38rem]">
      <header className="mb-12">
        <p className="label mb-4">Writing</p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
          Notes from building.
        </h1>
        <p className="mt-4 text-ink-2 leading-relaxed">
          Engineering logs, ideas, and field notes.
        </p>
      </header>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-10 text-sm text-ink-3">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="block group mb-10 pb-10 border-b border-line"
        >
          <div className="flex flex-wrap gap-3 mb-3 text-sm text-ink-3">
            <span className="text-mark">Featured</span>
            <span>{featured.date}</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink group-hover:text-mark transition-colors">
            {featured.title}
          </h2>
          <p className="mt-3 text-ink-2 leading-relaxed">{featured.excerpt}</p>
        </Link>
      )}

      <div className="divide-y divide-[var(--color-line)]">
        {rest.map((post) => (
          <article key={post.slug} className="py-8 first:pt-0">
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="flex flex-wrap gap-3 mb-2 text-sm text-ink-3">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.category}</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl tracking-tight text-ink group-hover:text-mark transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-ink-2 leading-relaxed">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
