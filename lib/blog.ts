import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { ensureBlogSchema, getSql } from "@/lib/db";

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
  contentHtml?: string;
  contentFormat?: "html" | "markdown";
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  contentFormat?: "html" | "markdown";
  category?: string;
  tags?: string[];
  published?: boolean;
  date?: string;
}

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  content_format: "html" | "markdown";
  category: string;
  tags: string[] | null;
  published: boolean;
  date: string | Date;
  created_at: string | Date;
  updated_at: string | Date;
};

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

function formatDateTime(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}

function rowToPost(row: PostRow, includeContent = true): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: formatDate(row.date),
    excerpt: row.excerpt || "",
    category: row.category || "Uncategorized",
    tags: row.tags || [],
    published: row.published,
    contentFormat: row.content_format,
    contentHtml: includeContent ? row.content : undefined,
    createdAt: formatDateTime(row.created_at),
    updatedAt: formatDateTime(row.updated_at),
  };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}

/** Resolve stored content to HTML for rendering. */
export async function resolveContentHtml(post: BlogPost): Promise<string> {
  const raw = post.contentHtml || "";
  if (!raw) return "";
  if (post.contentFormat === "markdown") {
    return markdownToHtml(raw);
  }
  // Heuristic: plain markdown without block tags
  if (!/<[a-z][\s\S]*>/i.test(raw) && /(?:^|\n)\s*#{1,6}\s|^\s*[-*+]\s/m.test(raw)) {
    return markdownToHtml(raw);
  }
  return raw;
}

export async function getAllPosts(includeDrafts = false): Promise<BlogPost[]> {
  await ensureBlogSchema();
  const db = getSql();

  const rows = includeDrafts
    ? ((await db`
        SELECT id, slug, title, excerpt, content, content_format, category,
               tags, published, date, created_at, updated_at
        FROM blog_posts
        ORDER BY date DESC, created_at DESC
      `) as PostRow[])
    : ((await db`
        SELECT id, slug, title, excerpt, content, content_format, category,
               tags, published, date, created_at, updated_at
        FROM blog_posts
        WHERE published = true
        ORDER BY date DESC, created_at DESC
      `) as PostRow[]);

  return rows.map((row) => rowToPost(row, true));
}

export async function getPostBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {}
): Promise<BlogPost | null> {
  await ensureBlogSchema();
  const db = getSql();
  const realSlug = slug.replace(/\.md$/, "");

  const rows = options.includeDrafts
    ? ((await db`
        SELECT id, slug, title, excerpt, content, content_format, category,
               tags, published, date, created_at, updated_at
        FROM blog_posts
        WHERE slug = ${realSlug}
        LIMIT 1
      `) as PostRow[])
    : ((await db`
        SELECT id, slug, title, excerpt, content, content_format, category,
               tags, published, date, created_at, updated_at
        FROM blog_posts
        WHERE slug = ${realSlug} AND published = true
        LIMIT 1
      `) as PostRow[]);

  if (!rows[0]) return null;
  return rowToPost(rows[0], true);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  await ensureBlogSchema();
  const db = getSql();
  const rows = (await db`
    SELECT id, slug, title, excerpt, content, content_format, category,
           tags, published, date, created_at, updated_at
    FROM blog_posts
    WHERE published = true AND lower(category) = lower(${category})
    ORDER BY date DESC, created_at DESC
  `) as PostRow[];
  return rows.map((row) => rowToPost(row, true));
}

export async function getAllCategories(): Promise<string[]> {
  await ensureBlogSchema();
  const db = getSql();
  const rows = (await db`
    SELECT DISTINCT category
    FROM blog_posts
    WHERE published = true
    ORDER BY category ASC
  `) as { category: string }[];
  return rows.map((r) => r.category);
}

export async function getPostWithHtml(slug: string): Promise<BlogPost | null> {
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return null;
  const contentHtml = await resolveContentHtml(post);
  return { ...post, contentHtml };
}

export async function createPost(input: BlogPostInput): Promise<BlogPost> {
  await ensureBlogSchema();
  const db = getSql();

  const title = input.title.trim();
  if (!title) throw new Error("Title is required");
  if (!input.content?.trim()) throw new Error("Content is required");

  let slug = (input.slug || slugify(title)).trim();
  if (!slug) throw new Error("Could not derive a valid slug");

  // Ensure unique slug
  const existing = (await db`
    SELECT slug FROM blog_posts WHERE slug = ${slug} LIMIT 1
  `) as { slug: string }[];
  if (existing[0]) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const date = input.date || new Date().toISOString().slice(0, 10);
  const tags = input.tags || [];
  const category = input.category?.trim() || "Tech";
  const excerpt = input.excerpt?.trim() || "";
  const contentFormat = input.contentFormat || "html";
  const published = input.published !== false;

  const rows = (await db`
    INSERT INTO blog_posts (
      slug, title, excerpt, content, content_format, category, tags, published, date
    ) VALUES (
      ${slug},
      ${title},
      ${excerpt},
      ${input.content},
      ${contentFormat},
      ${category},
      ${tags},
      ${published},
      ${date}
    )
    RETURNING id, slug, title, excerpt, content, content_format, category,
              tags, published, date, created_at, updated_at
  `) as PostRow[];

  return rowToPost(rows[0], true);
}

export async function updatePost(
  slug: string,
  input: Partial<BlogPostInput> & { newSlug?: string }
): Promise<BlogPost> {
  await ensureBlogSchema();
  const db = getSql();

  const current = await getPostBySlug(slug, { includeDrafts: true });
  if (!current) throw new Error("Post not found");

  const title = input.title?.trim() ?? current.title;
  const excerpt = input.excerpt !== undefined ? input.excerpt.trim() : current.excerpt;
  const content = input.content ?? current.contentHtml ?? "";
  const contentFormat =
    input.contentFormat ?? current.contentFormat ?? "html";
  const category = input.category?.trim() || current.category;
  const tags = input.tags ?? current.tags;
  const published =
    input.published !== undefined ? input.published : current.published;
  const date = input.date || current.date;

  let nextSlug = input.newSlug?.trim() || input.slug?.trim() || current.slug;
  if (nextSlug !== current.slug) {
    nextSlug = slugify(nextSlug) || current.slug;
    const clash = (await db`
      SELECT slug FROM blog_posts
      WHERE slug = ${nextSlug} AND slug <> ${current.slug}
      LIMIT 1
    `) as { slug: string }[];
    if (clash[0]) throw new Error("Slug already in use");
  }

  const rows = (await db`
    UPDATE blog_posts SET
      slug = ${nextSlug},
      title = ${title},
      excerpt = ${excerpt},
      content = ${content},
      content_format = ${contentFormat},
      category = ${category},
      tags = ${tags},
      published = ${published},
      date = ${date},
      updated_at = NOW()
    WHERE slug = ${current.slug}
    RETURNING id, slug, title, excerpt, content, content_format, category,
              tags, published, date, created_at, updated_at
  `) as PostRow[];

  if (!rows[0]) throw new Error("Failed to update post");
  return rowToPost(rows[0], true);
}

export async function deletePost(slug: string): Promise<boolean> {
  await ensureBlogSchema();
  const db = getSql();
  const rows = (await db`
    DELETE FROM blog_posts WHERE slug = ${slug}
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

export async function upsertPostBySlug(
  slug: string,
  input: BlogPostInput
): Promise<BlogPost> {
  const existing = await getPostBySlug(slug, { includeDrafts: true });
  if (existing) {
    return updatePost(slug, { ...input, newSlug: slug });
  }
  return createPost({ ...input, slug });
}
