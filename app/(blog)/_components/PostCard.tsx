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
      <Link href={`/${post.slug}`} className="block group cursor-pointer">
        <article>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
            <span className="text-mark">Featured</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>{post.category}</span>
          </div>
          <h2 className="font-display uppercase text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.03em] text-ink group-hover:text-mark transition-colors duration-150 leading-[0.95]">
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
      <Link href={`/${post.slug}`} className="block cursor-pointer">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase text-ink-3">
          <time dateTime={post.date}>{post.date}</time>
          <ReadingTime
            content={post.contentHtml || post.excerpt}
            className="text-ink-3"
          />
          <span>{post.category}</span>
        </div>
        <h3
          className={`font-display uppercase tracking-[-0.02em] text-ink group-hover:text-mark transition-colors duration-150 leading-[1.05] ${
            variant === "grid" ? "text-xl" : "text-[1.35rem] md:text-2xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 text-[0.95rem] text-ink-2 leading-relaxed line-clamp-2 max-w-[36rem]">
          {post.excerpt}
        </p>
      </Link>
    </article>
  );
}
