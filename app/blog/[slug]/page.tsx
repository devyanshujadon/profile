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
    title: `${post.title} • Blog`,
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
    <article className="max-w-3xl mx-auto px-6 pt-8 pb-20">
      <header className="mb-16">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full tracking-wide uppercase">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-sm font-medium text-surface-500">{post.date}</time>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-8 tracking-tight text-surface-900 leading-[1.1]">{post.title}</h1>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-surface-500 bg-surface-50 subtle-border px-2.5 py-1 rounded-md tracking-wide uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div 
        className="prose prose-zinc prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-500 prose-pre:bg-surface-900 prose-pre:border prose-pre:border-surface-800 prose-pre:shadow-xl prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}