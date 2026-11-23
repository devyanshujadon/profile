import { getAllPosts, getAllCategories } from "@/lib/blog";
import { journalPrefix } from "@/lib/journal-path";
import PostCard from "../_components/PostCard";
import Sidebar from "../_components/Sidebar";

export const revalidate = 60;

export const metadata = {
  title: "All Entries",
  description: "Engineering notes and writing by Devyanshu Jadon.",
};

export default async function JournalHomePage() {
  const prefix = await journalPrefix();
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
    <>
      <header className="section-head">
        <div>
          <p className="kicker">Journal</p>
          <h1>Notes from building.</h1>
        </div>
        <p>Engineering logs, ideas, and field notes.</p>
      </header>

      <div className="journal-layout">
        <div className="journal-list">
          {featured ? <PostCard post={featured} href={`${prefix}/${featured.slug}`} variant="featured" /> : null}
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} href={`${prefix}/${post.slug}`} />
          ))}
          {posts.length === 0 ? <p className="text-ink-3">No entries yet.</p> : null}
        </div>
        <Sidebar categories={categories} tags={tags} prefix={prefix} />
      </div>
    </>
  );
}
