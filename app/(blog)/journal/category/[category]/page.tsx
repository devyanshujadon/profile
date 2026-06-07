import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAllCategories,
  getAllPosts,
  getPostsByCategory,
} from "@/lib/blog";
import PostCard from "../../../_components/PostCard";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map(category => ({
    category: encodeURIComponent(category.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const formatted = decoded.charAt(0).toUpperCase() + decoded.slice(1);

  return {
    title: `${formatted} Entries`,
    description: `All ${formatted} posts from the Journal.`,
    alternates: { canonical: `/category/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  const allCategories = getAllCategories();
  const matched = allCategories.find(
    c => c.toLowerCase() === decoded.toLowerCase()
  );

  if (!matched) notFound();

  const posts = getPostsByCategory(matched);
  const totalPosts = getAllPosts().length;

  return (
    <div className="max-w-[1400px] mx-auto">
      <header className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mono text-xs font-bold uppercase text-ink hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        <div className="mb-4 px-4 py-1 bg-accent text-base inline-block">
          <span className="mono text-sm font-bold uppercase">CATEGORY</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-4 tracking-tight">
          {matched.toUpperCase()}<span className="text-accent">.</span>
        </h1>
        <p className="mono text-sm text-ink-light">
          {posts.length} {posts.length === 1 ? "POST" : "POSTS"}
          {totalPosts > posts.length && ` · ${totalPosts} TOTAL`}
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="brutal-card p-12 text-center">
          <p className="font-display font-bold text-2xl text-ink">NO POSTS YET</p>
          <p className="mono text-sm text-ink-light mt-2">
            No entries filed under this category.
          </p>
        </div>
      )}
    </div>
  );
}
