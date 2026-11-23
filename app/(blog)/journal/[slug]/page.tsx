import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  resolveContentHtml,
} from "@/lib/blog";
import ReadingTime from "../../_components/ReadingTime";
import { journalPrefix } from "@/lib/journal-path";

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
  const prefix = await journalPrefix();
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <article className="mx-auto max-w-[40rem]">
      <header className="mb-10">
        <Link href={prefix || "/"} className="text-link journal-back">
          Journal
        </Link>
        <p className="journal-meta">
          <span className="is-mark">{post.category}</span>
          <time dateTime={post.date}>{post.date}</time>
          <ReadingTime content={post.contentHtml || post.excerpt} />
        </p>
        <h1>{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-lg text-ink-2 leading-relaxed">{post.excerpt}</p> : null}
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" className="journal-cover" />
        ) : null}
      </header>

      <div
        className="prose prose-site max-w-none
          prose-headings:font-display prose-headings:tracking-[-0.02em] prose-headings:text-ink
          prose-p:text-ink-2 prose-p:leading-[1.75]
          prose-a:text-ink prose-a:underline prose-a:underline-offset-2
          prose-strong:text-ink prose-strong:font-medium
          prose-code:text-ink prose-code:px-1 prose-code:text-[0.9em]
          prose-code:before:content-none prose-code:after:content-none
          prose-blockquote:border-mark prose-blockquote:text-ink-2 prose-blockquote:not-italic
          prose-li:text-ink-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {(prev || next) && (
        <nav className="journal-pager" aria-label="More entries">
          {prev ? (
            <Link href={`${prefix}/${prev.slug}`} className="journal-card">
              <span className="journal-meta"><span>Previous</span></span>
              <span className="block font-display text-lg text-ink leading-snug">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`${prefix}/${next.slug}`} className="journal-card is-next">
              <span className="journal-meta"><span>Next</span></span>
              <span className="block font-display text-lg text-ink leading-snug">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      )}
    </article>
  );
}
