import Link from "next/link";
import { getPostBySlug, getAllPosts, markdownToHtml } from "@/lib/blog";
import { notFound } from "next/navigation";

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
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const contentHtml = await markdownToHtml(post.contentHtml || "");

  return (
    <article className="mx-auto max-w-[680px]">
      <header className="mb-12">
        <Link
          href="/blog"
          className="text-sm text-ink-3 hover:text-mark transition-colors mb-10 inline-block"
        >
          ← Writing
        </Link>
        <div className="flex flex-wrap gap-3 mb-5 text-sm text-ink-3">
          <span className="text-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-ink leading-[1.1]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg text-ink-2 leading-relaxed">{post.excerpt}</p>
        )}
      </header>

      <div
        className="prose prose-neutral max-w-none
          prose-headings:font-display prose-headings:font-medium prose-headings:text-ink
          prose-p:text-ink-2 prose-a:text-mark
          prose-strong:text-ink
          prose-code:text-mark prose-code:bg-canvas-2
          prose-code:before:content-none prose-code:after:content-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
