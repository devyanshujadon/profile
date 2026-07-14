import { getAllPosts, getAllCategories } from "@/lib/blog";
import PostCard from "../_components/PostCard";
import Sidebar from "../_components/Sidebar";

export const revalidate = 60;

export const metadata = {
  title: "All Entries",
  description: "Engineering notes and writing by Devyanshu Jadon.",
};

export default async function JournalHomePage() {
  const posts = await getAllPosts();
  const categoriesList = await getAllCategories();
  const [featured, ...rest] = posts;

  const categories = categoriesList.map((name) => ({
    name,
    count: posts.filter(
      (p) => p.category.toLowerCase() === name.toLowerCase()
    ).length,
  }));

  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return (
    <div className="mx-auto max-w-[42rem] lg:max-w-[56rem]">
      <header className="mb-12 md:mb-14">
        <p className="label mb-4">Writing</p>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-ink max-w-[14ch] leading-[1.15]">
          Notes from building.
        </h1>
        <p className="mt-4 text-ink-2 max-w-md leading-relaxed">
          Engineering logs, ideas, and field notes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_11rem] gap-12 lg:gap-16">
        <div>
          {featured && (
            <div className="mb-10 pb-10 border-b border-line">
              <PostCard post={featured} variant="featured" />
            </div>
          )}

          {rest.length > 0 && (
            <div className="divide-y divide-[var(--color-line)]">
              {rest.map((post) => (
                <div key={post.slug} className="py-8 first:pt-0">
                  <PostCard post={post} variant="list" />
                </div>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-ink-3">No entries yet.</p>
          )}
        </div>

        <div className="hidden lg:block">
          <Sidebar categories={categories} tags={tags} />
        </div>
      </div>
    </div>
  );
}
