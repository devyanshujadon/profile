import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.contentHtml || "");

  const all = getAllPosts();
  const idx = all.findIndex(p => p.slug === post.slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mono text-xs font-bold uppercase text-ink hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-accent text-base text-xs font-bold uppercase tracking-wider brutal-border-2">
            {post.category}
          </span>
          <time dateTime={post.date} className="mono text-xs text-ink-light font-bold">
            {post.date}
          </time>
          <ReadingTime content={post.contentHtml || post.excerpt} className="text-ink-light" />
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-[1.05] tracking-tight text-ink">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl font-display font-medium text-ink-light leading-relaxed mb-6 border-l-4 border-accent pl-4">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
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
        )}
      </header>

      <div
        className="prose prose-stone max-w-none
          prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4
          prose-strong:text-ink prose-strong:font-bold
          prose-code:font-mono prose-code:bg-base-dark prose-code:text-ink
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-ink prose-pre:text-base prose-pre:border-3 prose-pre:border-ink
          prose-pre:shadow-[4px_4px_0_0_#0d0d0d] prose-pre:rounded-none
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-base-dark
          prose-blockquote:font-display prose-blockquote:font-medium prose-blockquote:not-italic
          prose-blockquote:px-4 prose-blockquote:py-1
          prose-img:brutal-border-2
          prose-hr:border-ink prose-hr:border-t-2
          prose-table:border-2 prose-table:border-ink
          prose-th:bg-ink prose-th:text-base prose-th:p-2 prose-th:border-2 prose-th:border-ink
          prose-td:p-2 prose-td:border-2 prose-td:border-ink"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {(prev || next) && (
        <nav className="mt-16 pt-8 border-t-3 border-ink grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/${prev.slug}`}
              className="brutal-card p-4 bg-white hover:bg-accent-2 transition-colors group"
            >
              <span className="mono text-[10px] font-bold uppercase text-ink-light flex items-center gap-1 mb-2">
                <ArrowLeft size={12} /> Previous
              </span>
              <span className="block font-display font-bold text-ink group-hover:underline decoration-2 underline-offset-4 leading-tight">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/${next.slug}`}
              className="brutal-card p-4 bg-white hover:bg-accent-2 transition-colors group text-right"
            >
              <span className="mono text-[10px] font-bold uppercase text-ink-light flex items-center justify-end gap-1 mb-2">
                Next <ArrowRight size={12} />
              </span>
              <span className="block font-display font-bold text-ink group-hover:underline decoration-2 underline-offset-4 leading-tight">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </article>
  );
}
