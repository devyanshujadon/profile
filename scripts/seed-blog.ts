/**
 * Seed Neon with markdown posts from content/blog.
 * Usage: npx tsx --env-file=.env.local scripts/seed-blog.ts
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ensureBlogSchema } from "../lib/db";
import { upsertPostBySlug, markdownToHtml } from "../lib/blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  await ensureBlogSchema();
  console.log("Schema ready.");

  if (!fs.existsSync(postsDirectory)) {
    console.log("No content/blog directory — nothing to seed.");
    return;
  }

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} markdown file(s).`);

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
    const { data, content } = matter(raw);

    const title = String(data.title || slug);
    const excerpt = String(data.excerpt || "");
    const category = String(data.category || "Tech");
    const tags = Array.isArray(data.tags)
      ? data.tags.map(String)
      : [];
    const published = data.published !== false;
    const date = data.date
      ? String(data.date).slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    // Store as HTML so the TipTap CMS can edit easily
    const html = await markdownToHtml(content);

    const post = await upsertPostBySlug(slug, {
      title,
      slug,
      excerpt,
      content: html,
      contentFormat: "html",
      category,
      tags,
      published,
      date,
    });

    console.log(
      `  ✓ ${post.slug} (${post.published ? "published" : "draft"})`
    );
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
