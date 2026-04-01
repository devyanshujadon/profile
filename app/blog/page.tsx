import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog';

export const metadata = {
  title: 'Blog • Devyanshu',
  description: 'Thoughts on technology, development, and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-8">
      <header className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4 tracking-tight text-surface-900">Journal</h1>
        <p className="text-surface-500 font-medium max-w-lg mx-auto">Thoughts, engineering logs, and explorations in software.</p>
      </header>

      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map(category => (
            <span
              key={category}
              className="px-4 py-1.5 text-xs font-semibold bg-white subtle-border text-surface-600 rounded-full shadow-sm"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-12">
        {posts.map(post => (
          <article key={post.slug} className="group relative">
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {post.title}</span>
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
              <time dateTime={post.date} className="text-sm font-medium text-surface-400">
                {post.date}
              </time>
              <span className="hidden sm:inline text-surface-300">•</span>
              <span className="text-sm font-semibold text-primary-600">{post.category}</span>
            </div>
            
            <h2 className="text-2xl font-display font-bold mb-3 text-surface-900 group-hover:text-primary-600 transition-colors">
              {post.title}
            </h2>
            
            <p className="text-surface-600 mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-2 relative z-20">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold text-surface-500 bg-surface-50 px-2.5 py-1 rounded-md tracking-wide uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-surface-500 font-medium">No entries found.</p>
        </div>
      )}
    </div>
  );
}