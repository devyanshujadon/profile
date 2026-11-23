import { getAllPosts, getAllCategories } from "@/lib/blog";
import PostCard from "@/app/(blog)/_components/PostCard";

export const revalidate = 60;

export const metadata = {
  title: "Writing",
  description: "Engineering notes and ideas.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const [featured, ...rest] = posts;

  return (
    <div className="section shell">
      <header className="section-head">
        <div>
          <p className="kicker">Writing</p>
          <h1>Notes from building.</h1>
        </div>
        <p>Engineering logs, ideas, and field notes.</p>
      </header>

      {categories.length > 0 ? (
        <p className="journal-tags mb-5">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </p>
      ) : null}

      <div className="journal-list">
        {featured ? <PostCard post={featured} href={`/blog/${featured.slug}`} variant="featured" /> : null}
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} href={`/blog/${post.slug}`} />
        ))}
      </div>
    </div>
  );
}
