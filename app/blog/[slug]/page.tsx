import Link from 'next/link';
import { getPostBySlug, getAllPosts, markdownToHtml } from '@/lib/blog';
import { notFound } from 'next/navigation';

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
    title: `${post.title} | Blog`,
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
    <article className="max-w-3xl mx-auto px-4">
      <header className="mb-8">
        <Link 
          href="/blog" 
          className="text-sm text-zinc-500 hover:text-zinc-700 mb-4 inline-block"
        >
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span className="text-zinc-700 font-medium">{post.category}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-sm text-zinc-500 bg-zinc-50 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div 
        className="prose prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}