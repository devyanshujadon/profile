import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import PostCard from "../../../_components/PostCard";

export const revalidate = 60;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((category) => ({
      category: encodeURIComponent(category.toLowerCase()),
    }));
  } catch {
    return [];
  }
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
  const categories = await getAllCategories();
  const matched = categories.find(
    (c) => c.toLowerCase() === decoded.toLowerCase()
  );
  if (!matched) notFound();

  const posts = await getPostsByCategory(matched);

  return (
    <div className="mx-auto max-w-[42rem]">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm text-ink-3 hover:text-ink transition-colors mb-8 inline-block"
        >
          ← Journal
        </Link>
        <p className="label mb-3">Category</p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ink">
          {matched}
        </h1>
        <p className="mt-2 text-sm text-ink-3">
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
