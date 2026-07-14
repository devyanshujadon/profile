import Link from "next/link";
import {
  getPostBySlug,
  getAllPosts,
  resolveContentHtml,
} from "@/lib/blog";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const contentHtml = await resolveContentHtml(post);

  return (
    <article className="mx-auto max-w-[38rem]">
      <header className="mb-10">
        <Link
          href="/blog"
          className="text-sm text-ink-3 hover:text-ink transition-colors mb-8 inline-block"
        >
          ← Writing
        </Link>
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-ink-3">
          <span className="text-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.15]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 text-lg text-ink-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      <div
        className="prose prose-site prose-neutral max-w-none
          prose-headings:font-display prose-headings:font-medium prose-headings:text-ink
          prose-p:text-ink-2 prose-a:text-mark
          prose-strong:text-ink
          prose-code:text-ink prose-code:bg-canvas-2 prose-code:px-1 prose-code:rounded
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-ink prose-pre:text-[var(--color-canvas)]"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
