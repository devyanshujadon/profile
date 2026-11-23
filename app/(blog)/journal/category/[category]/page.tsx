import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { journalPrefix } from "@/lib/journal-path";
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
  const prefix = await journalPrefix();

  return (
    <div className="mx-auto max-w-[42rem]">
      <header className="section-head">
        <div>
          <Link href={prefix || "/"} className="text-link journal-back">
            Journal
          </Link>
          <h1>{matched}</h1>
          <p className="journal-meta">
            <span>{posts.length} {posts.length === 1 ? "post" : "posts"}</span>
          </p>
        </div>
      </header>
      <div className="journal-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} href={`${prefix}/${post.slug}`} />
        ))}
      </div>
    </div>
  );
}
