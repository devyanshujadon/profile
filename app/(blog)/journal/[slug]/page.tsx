import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  resolveContentHtml,
} from "@/lib/blog";
import ReadingTime from "../../_components/ReadingTime";

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
    alternates: { canonical: `/${post.slug}` },
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage }] }
      : undefined,
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) notFound();

  const contentHtml = await resolveContentHtml(post);
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <article className="mx-auto max-w-[40rem]">
      <header className="mb-10 md:mb-12 pb-8 border-b border-ink">
        <Link href="/" className="nav-link mb-8 inline-block">
          Journal
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
          <span className="text-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
          <ReadingTime
            content={post.contentHtml || post.excerpt}
            className="text-ink-3"
          />
        </div>

        <h1 className="font-display uppercase text-[clamp(1.85rem,4.5vw,3.25rem)] tracking-[-0.03em] text-ink leading-[0.95]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-5 text-lg text-ink-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            className="mt-8 w-full border border-ink object-cover max-h-[28rem]"
          />
        )}
      </header>

      <div
        className="prose prose-site prose-neutral max-w-none
          prose-headings:font-display prose-headings:font-normal prose-headings:uppercase prose-headings:tracking-[-0.02em] prose-headings:text-ink
          prose-p:text-ink-2 prose-p:leading-[1.75]
          prose-a:text-ink prose-a:underline prose-a:underline-offset-2
          prose-strong:text-ink prose-strong:font-medium
          prose-code:text-ink prose-code:bg-canvas-2 prose-code:px-1 prose-code:text-[0.9em]
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-ink prose-pre:text-[var(--color-canvas)]
          prose-blockquote:border-mark prose-blockquote:text-ink-2 prose-blockquote:not-italic
          prose-li:text-ink-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {(prev || next) && (
        <nav className="mt-14 pt-8 border-t-2 border-ink grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prev ? (
            <Link href={`/${prev.slug}`} className="group cursor-pointer">
              <span className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
                Previous
              </span>
              <span className="block mt-1 font-display uppercase text-lg text-ink group-hover:text-mark transition-colors duration-150 leading-snug">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/${next.slug}`} className="group sm:text-right cursor-pointer">
              <span className="font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
                Next
              </span>
              <span className="block mt-1 font-display uppercase text-lg text-ink group-hover:text-mark transition-colors duration-150 leading-snug">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      )}
    </article>
  );
}
