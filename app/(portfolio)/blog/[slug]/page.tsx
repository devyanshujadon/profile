import Link from "next/link";
import {
  getPostBySlug,
  getAllPosts,
  resolveContentHtml,
} from "@/lib/blog";
import { notFound } from "next/navigation";
import ReadingTime from "@/app/(blog)/_components/ReadingTime";

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
    <article className="section shell journal-read">
      <header className="mb-10">
        <Link href="/blog" className="text-link journal-back">
          Writing
        </Link>
        <p className="journal-meta">
          <span className="is-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
          <ReadingTime content={post.contentHtml || post.excerpt} />
        </p>
        <h1>{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-lg text-ink-2 leading-relaxed">{post.excerpt}</p> : null}
      </header>
      <div
        className="prose prose-site max-w-none
          prose-headings:font-display prose-headings:tracking-[-0.02em] prose-headings:text-ink
          prose-p:text-ink-2
          prose-a:text-ink prose-a:underline prose-a:underline-offset-2
          prose-strong:text-ink prose-strong:font-medium
          prose-code:text-ink prose-code:px-1
          prose-code:before:content-none prose-code:after:content-none
          prose-blockquote:border-mark prose-blockquote:not-italic
          prose-li:text-ink-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
