import { getAllPosts, getAllCategories } from "@/lib/blog";
import PostCard from "../_components/PostCard";
import Sidebar from "../_components/Sidebar";

export const metadata = {
  title: "All Entries",
  description:
    "Engineering logs, ideas, and field notes from building software by Devyanshu Jadon.",
};

export default function JournalHomePage() {
  const posts = getAllPosts();
  const categoriesList = getAllCategories();
  const [featured, ...rest] = posts;

  const categories = categoriesList.map(name => ({
    name,
    count: posts.filter(p => p.category.toLowerCase() === name.toLowerCase()).length,
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
    <div className="max-w-[1400px] mx-auto">
      <header className="mb-12 md:mb-16">
        <div className="mb-4 px-4 py-1 bg-ink text-base inline-block">
          <span className="mono text-sm text-base">JOURNAL — EST. 2024</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] mb-6 tracking-tight">
          WRITINGS<span className="text-accent">.</span>
        </h1>
        <p className="text-lg md:text-xl font-display font-medium text-ink-light max-w-2xl leading-relaxed">
          ENGINEERING LOGS, IDEAS, AND FIELD NOTES FROM BUILDING SOFTWARE.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          {featured && (
            <div className="mb-12">
              <PostCard post={featured} variant="featured" />
            </div>
          )}

          {rest.length > 0 && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <span className="section-label">All Entries</span>
                <span className="flex-1 h-0.5 bg-ink" />
                <span className="mono text-xs text-ink-light">
                  {rest.length} {rest.length === 1 ? "POST" : "POSTS"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map(post => (
                  <PostCard key={post.slug} post={post} variant="grid" />
                ))}
              </div>
            </>
          )}

          {posts.length === 0 && (
            <div className="brutal-card p-12 text-center">
              <p className="font-display font-bold text-3xl text-ink">NO ENTRIES YET</p>
              <p className="mono text-sm text-ink-light mt-2">Check back soon.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <Sidebar categories={categories} tags={tags} />
        </div>
      </div>
    </div>
  );
}
