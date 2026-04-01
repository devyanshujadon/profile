import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog';

export const metadata = {
  title: 'Blog | Devyanshu',
  description: 'Thoughts on technology, development, and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-zinc-600">Thoughts on technology, development, and more.</p>
      </header>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <span
              key={category}
              className="px-3 py-1 text-sm bg-zinc-100 text-zinc-700 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.slug} className="border-b border-zinc-200 pb-8">
            <div className="flex items-center gap-3 text-sm text-zinc-500 mb-2">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span className="text-zinc-700 font-medium">{post.category}</span>
            </div>
            <Link href={`/blog/${post.slug}`} className="block group">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-zinc-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-zinc-600 mb-4">{post.excerpt}</p>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs text-zinc-500 bg-zinc-50 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-zinc-500">No posts yet.</p>
      )}
    </div>
  );
}