import Link from 'next/link';
import { getPostBySlug, getAllPosts, markdownToHtml } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.contentHtml || '');

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mono text-xs font-bold uppercase text-ink hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-accent text-base text-xs font-bold uppercase tracking-wider brutal-border-2">
            {post.category}
          </span>
          <time dateTime={post.date} className="mono text-xs text-ink-light">{post.date}</time>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[1.05] tracking-tight text-ink">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl font-display font-medium text-ink-light leading-relaxed mb-6 border-l-4 border-accent pl-4">
            {post.excerpt}
          </p>
        )}

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
          prose-img:brutal-border-2
          prose-hr:border-ink prose-hr:border-t-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
