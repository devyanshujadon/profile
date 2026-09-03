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
    <div className="mx-auto max-w-[40rem] px-5 sm:px-0 py-8">
      <header className="mb-12 pb-8 border-b-2 border-ink">
        <h1 className="font-display uppercase text-[clamp(2.25rem,6vw,3.75rem)] tracking-[-0.04em] leading-[0.9] text-ink">
          Notes from building
        </h1>
        <p className="mt-5 text-ink-2 leading-relaxed">
          Engineering logs, ideas, and field notes.
        </p>
      </header>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-10 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="block group mb-0 pb-10 border-b border-ink cursor-pointer"
        >
          <div className="flex flex-wrap gap-4 mb-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
            <span className="text-mark">Featured</span>
            <span>{featured.date}</span>
          </div>
          <h2 className="font-display uppercase text-[clamp(1.6rem,3.5vw,2.4rem)] tracking-[-0.03em] text-ink group-hover:text-mark transition-colors duration-150 leading-[0.95]">
            {featured.title}
          </h2>
          <p className="mt-3 text-ink-2 leading-relaxed">{featured.excerpt}</p>
        </Link>
      )}

      <div>
        {rest.map((post) => (
          <article key={post.slug} className="py-8 border-b border-ink">
            <Link href={`/blog/${post.slug}`} className="block group cursor-pointer">
              <div className="flex flex-wrap gap-4 mb-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.category}</span>
              </div>
              <h2 className="font-display uppercase text-xl md:text-2xl tracking-[-0.02em] text-ink group-hover:text-mark transition-colors duration-150">
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
