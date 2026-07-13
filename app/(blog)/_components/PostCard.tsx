import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import ReadingTime from "./ReadingTime";

interface PostCardProps {
  post: BlogPost;
  variant?: "featured" | "grid" | "list";
}

export default function PostCard({ post, variant = "list" }: PostCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/${post.slug}`} className="block group">
        <article>
          <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-ink-3">
            <span className="text-mark font-medium">Featured</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>{post.category}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink group-hover:text-mark transition-colors leading-[1.15]">
            {post.title}
          </h2>
          <p className="mt-4 text-ink-2 leading-relaxed max-w-[36rem]">
            {post.excerpt}
          </p>
        </article>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link href={`/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-3 mb-2 text-sm text-ink-3">
          <time dateTime={post.date}>{post.date}</time>
          <ReadingTime content={post.contentHtml || post.excerpt} className="text-ink-3" />
          <span>{post.category}</span>
        </div>
        <h3
          className={`font-display tracking-tight text-ink group-hover:text-mark transition-colors ${
            variant === "grid" ? "text-xl" : "text-2xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 text-ink-2 leading-relaxed line-clamp-2 max-w-[36rem]">
          {post.excerpt}
        </p>
      </Link>
    </article>
  );
}
