import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        <article className="brutal-card p-6 md:p-8 bg-accent-2 h-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2 py-0.5 bg-ink text-base mono text-[10px] font-bold uppercase tracking-wider">
              Featured
            </span>
            <time dateTime={post.date} className="mono text-xs text-ink font-bold">
              {post.date}
            </time>
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              {post.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-ink leading-[1.05] group-hover:underline decoration-2 underline-offset-4">
            {post.title}
          </h2>
          <p className="text-ink-light leading-relaxed mb-6 text-base md:text-lg">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-ink bg-base brutal-border-2 px-2 py-1 uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 mono text-xs font-bold uppercase text-ink group-hover:text-accent transition-colors">
              Read entry <ArrowUpRight size={14} />
            </span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "grid") {
    return (
      <Link href={`/${post.slug}`} className="block group h-full">
        <article className="brutal-card p-5 h-full flex flex-col bg-white hover:bg-accent-2 transition-colors">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <time dateTime={post.date} className="mono text-[10px] text-ink-light font-bold">
              {post.date}
            </time>
            <span className="w-1 h-1 bg-ink rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink">
              {post.category}
            </span>
          </div>
          <h3 className="text-xl font-display font-bold mb-3 text-ink leading-tight group-hover:underline decoration-2 underline-offset-4 flex-1">
            {post.title}
          </h3>
          <p className="text-sm text-ink-light leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[9px] font-bold text-ink bg-base-dark brutal-border-2 px-1.5 py-0.5 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link href={`/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <time dateTime={post.date} className="mono text-xs text-ink-light font-bold">
            {post.date}
          </time>
          <ReadingTime content={post.contentHtml || post.excerpt} className="text-ink-light" />
          <span className="w-1 h-1 bg-ink rounded-full" />
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            {post.category}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 text-ink leading-tight group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-ink-light leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-bold text-ink bg-base-dark brutal-border-2 px-2 py-1 uppercase tracking-wider"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
