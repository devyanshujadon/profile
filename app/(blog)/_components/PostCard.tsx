import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import ReadingTime from "./ReadingTime";

interface PostCardProps {
  post: BlogPost;
  href: string;
  variant?: "featured" | "list";
}

export default function PostCard({ post, href, variant = "list" }: PostCardProps) {
  return (
    <Link href={href} className={variant === "featured" ? "journal-card journal-feature" : "journal-card"}>
      <p className="journal-meta">
        {variant === "featured" ? <span className="is-mark">Featured</span> : null}
        <time dateTime={post.date}>{post.date}</time>
        {variant === "list" ? (
          <ReadingTime content={post.contentHtml || post.excerpt} />
        ) : null}
        <span className="is-mark">{post.category}</span>
      </p>
      {variant === "featured" ? (
        <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] tracking-[-0.03em] text-ink leading-[1.05]">
          {post.title}
        </h2>
      ) : (
        <h3 className="font-display text-[1.35rem] md:text-2xl tracking-[-0.02em] text-ink leading-[1.1]">
          {post.title}
        </h3>
      )}
      <p className="leading-relaxed">{post.excerpt}</p>
    </Link>
  );
}
