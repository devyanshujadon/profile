import Link from "next/link";
import { notFound } from "next/navigation";
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
  return getAllCategories().map((category) => ({
    category: encodeURIComponent(category.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const formatted = decoded.charAt(0).toUpperCase() + decoded.slice(1);
  return {
    title: `${formatted}`,
    description: `${formatted} posts.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const matched = getAllCategories().find(
    (c) => c.toLowerCase() === decoded.toLowerCase()
  );
  if (!matched) notFound();

  const posts = getPostsByCategory(matched);

  return (
    <div className="mx-auto max-w-[920px]">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm text-ink-3 hover:text-mark transition-colors mb-8 inline-block"
        >
          ← Journal
        </Link>
        <p className="label mb-3">Category</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-ink">
          {matched}
        </h1>
        <p className="mt-3 text-sm text-ink-3">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <div className="divide-y divide-[var(--color-line)]">
        {posts.map((post) => (
          <div key={post.slug} className="py-8 first:pt-0">
            <PostCard post={post} variant="list" />
          </div>
        ))}
      </div>
    </div>
  );
}
