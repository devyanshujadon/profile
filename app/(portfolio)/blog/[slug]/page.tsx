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
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage }] }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const contentHtml = await resolveContentHtml(post);

  return (
    <article className="mx-auto max-w-[40rem] px-5 sm:px-0 py-8">
      <header className="mb-10 pb-8 border-b border-ink">
        <Link href="/blog" className="nav-link mb-8 inline-block">
          Writing
        </Link>
        <div className="flex flex-wrap gap-4 mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
          <span className="text-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h1 className="font-display uppercase text-[clamp(1.85rem,4.5vw,3.25rem)] tracking-[-0.03em] text-ink leading-[0.95]">
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
          prose-headings:font-display prose-headings:font-normal prose-headings:uppercase prose-headings:text-ink
          prose-p:text-ink-2 prose-a:text-ink prose-a:underline
          prose-strong:text-ink
          prose-code:text-ink prose-code:bg-canvas-2 prose-code:px-1
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-ink prose-pre:text-[var(--color-canvas)]"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
