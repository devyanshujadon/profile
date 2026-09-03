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
      <header className="mb-12 pb-8 border-b-2 border-ink">
        <Link href="/" className="nav-link mb-8 inline-block">
          Journal
        </Link>
        <h1 className="font-display uppercase text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] leading-[0.92] text-ink">
          {matched}
        </h1>
        <p className="mt-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <div>
        {posts.map((post) => (
          <div key={post.slug} className="py-8 border-b border-ink">
            <PostCard post={post} variant="list" />
          </div>
        ))}
      </div>
    </div>
  );
}
