import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
} from "@/lib/blog";
import ReadingTime from "../../_components/ReadingTime";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${post.slug}` },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) notFound();

  const contentHtml = await markdownToHtml(post.contentHtml || "");
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <article className="mx-auto max-w-[680px]">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm text-ink-3 hover:text-mark transition-colors mb-10 inline-block"
        >
          ← Journal
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-ink-3">
          <span className="text-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
          <ReadingTime content={post.contentHtml || post.excerpt} className="text-ink-3" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-ink leading-[1.1]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-6 text-lg text-ink-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      <div
        className="prose prose-neutral max-w-none
          prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink
          prose-p:text-ink-2 prose-p:leading-relaxed
          prose-a:text-mark prose-a:no-underline hover:prose-a:underline
          prose-strong:text-ink prose-strong:font-medium
          prose-code:text-mark prose-code:bg-canvas-2 prose-code:px-1 prose-code:rounded
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-ink prose-pre:text-[var(--color-canvas)] prose-pre:rounded-md
          prose-blockquote:border-mark prose-blockquote:text-ink-2
          prose-li:text-ink-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {(prev || next) && (
        <nav className="mt-16 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prev ? (
            <Link href={`/${prev.slug}`} className="group">
              <span className="text-sm text-ink-3">Previous</span>
              <span className="block mt-1 font-display text-lg text-ink group-hover:text-mark transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/${next.slug}`} className="group sm:text-right">
              <span className="text-sm text-ink-3">Next</span>
              <span className="block mt-1 font-display text-lg text-ink group-hover:text-mark transition-colors">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      )}
    </article>
  );
}
