import { ensureCmsSchema, getSql } from "@/lib/db";

/** Supported CMS entry types beyond blog posts. */
export type CmsEntryType = "project" | "page" | "note" | "media";

export type CmsStatus = "draft" | "published" | "archived";

export interface ProjectMeta {
  year?: string;
  tag?: string;
  href?: string;
  linkLabel?: string;
  stack?: string;
  points?: string[];
}

export interface MediaMeta {
  url?: string;
  alt?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  source?: string;
}

export interface PageMeta {
  template?: string;
  showInNav?: boolean;
}

export interface NoteMeta {
  pinned?: boolean;
}

export type CmsMeta = ProjectMeta & MediaMeta & PageMeta & NoteMeta & Record<string, unknown>;

export interface CmsEntry {
  id: string;
  type: CmsEntryType;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  contentFormat: "html" | "markdown" | "plain";
  status: CmsStatus;
  published: boolean;
  coverImage?: string | null;
  featured: boolean;
  tags: string[];
  sortOrder: number;
  meta: CmsMeta;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsEntryInput {
  type: CmsEntryType;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  contentFormat?: "html" | "markdown" | "plain";
  status?: CmsStatus;
  published?: boolean;
  coverImage?: string | null;
  featured?: boolean;
  tags?: string[];
  sortOrder?: number;
  meta?: CmsMeta;
  date?: string;
}

type EntryRow = {
  id: string;
  type: CmsEntryType;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  content_format: "html" | "markdown" | "plain";
  status: CmsStatus;
  published: boolean;
  cover_image: string | null;
  featured: boolean;
  tags: string[] | null;
  sort_order: number;
  meta: CmsMeta | string | null;
  date: string | Date;
  created_at: string | Date;
  updated_at: string | Date;
};

function formatDate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function formatDateTime(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function parseMeta(raw: CmsMeta | string | null): CmsMeta {
  if (!raw) return {};
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as CmsMeta;
    } catch {
      return {};
    }
  }
  return raw;
}

function rowToEntry(row: EntryRow): CmsEntry {
  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    content: row.content || "",
    contentFormat: row.content_format,
    status: row.status,
    published: row.published,
    coverImage: row.cover_image,
    featured: row.featured,
    tags: row.tags || [],
    sortOrder: row.sort_order ?? 0,
    meta: parseMeta(row.meta),
    date: formatDate(row.date),
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

export async function listEntries(
  type?: CmsEntryType,
  options: { includeDrafts?: boolean; search?: string } = {}
): Promise<CmsEntry[]> {
  await ensureCmsSchema();
  const db = getSql();
  const includeDrafts = Boolean(options.includeDrafts);
  const search = options.search?.trim() || "";

  // Neon tagged templates need static structure — branch carefully.
  if (type && search && includeDrafts) {
    const q = `%${search}%`;
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      WHERE type = ${type}
        AND (title ILIKE ${q} OR excerpt ILIKE ${q} OR slug ILIKE ${q})
      ORDER BY sort_order ASC, date DESC, created_at DESC
    `) as EntryRow[];
    return rows.map(rowToEntry);
  }

  if (type && search && !includeDrafts) {
    const q = `%${search}%`;
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      WHERE type = ${type} AND published = true
        AND (title ILIKE ${q} OR excerpt ILIKE ${q} OR slug ILIKE ${q})
      ORDER BY sort_order ASC, date DESC, created_at DESC
    `) as EntryRow[];
    return rows.map(rowToEntry);
  }

  if (type && !search && includeDrafts) {
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      WHERE type = ${type}
      ORDER BY sort_order ASC, date DESC, created_at DESC
    `) as EntryRow[];
    return rows.map(rowToEntry);
  }

  if (type && !search && !includeDrafts) {
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      WHERE type = ${type} AND published = true
      ORDER BY sort_order ASC, date DESC, created_at DESC
    `) as EntryRow[];
    return rows.map(rowToEntry);
  }

  if (!type && search && includeDrafts) {
    const q = `%${search}%`;
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      WHERE title ILIKE ${q} OR excerpt ILIKE ${q} OR slug ILIKE ${q}
      ORDER BY type ASC, sort_order ASC, date DESC
    `) as EntryRow[];
    return rows.map(rowToEntry);
  }

  if (!type && includeDrafts) {
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      ORDER BY type ASC, sort_order ASC, date DESC
    `) as EntryRow[];
    return rows.map(rowToEntry);
  }

  const rows = (await db`
    SELECT id, type, slug, title, excerpt, content, content_format, status,
           published, cover_image, featured, tags, sort_order, meta, date,
           created_at, updated_at
    FROM cms_entries
    WHERE published = true
    ORDER BY type ASC, sort_order ASC, date DESC
  `) as EntryRow[];
  return rows.map(rowToEntry);
}

export async function getEntryById(id: string): Promise<CmsEntry | null> {
  await ensureCmsSchema();
  const db = getSql();
  const rows = (await db`
    SELECT id, type, slug, title, excerpt, content, content_format, status,
           published, cover_image, featured, tags, sort_order, meta, date,
           created_at, updated_at
    FROM cms_entries
    WHERE id = ${id}
    LIMIT 1
  `) as EntryRow[];
  return rows[0] ? rowToEntry(rows[0]) : null;
}

export async function getEntryBySlug(
  type: CmsEntryType,
  slug: string,
  options: { includeDrafts?: boolean } = {}
): Promise<CmsEntry | null> {
  await ensureCmsSchema();
  const db = getSql();
  const realSlug = slug.replace(/\.md$/, "");

  if (options.includeDrafts) {
    const rows = (await db`
      SELECT id, type, slug, title, excerpt, content, content_format, status,
             published, cover_image, featured, tags, sort_order, meta, date,
             created_at, updated_at
      FROM cms_entries
      WHERE type = ${type} AND slug = ${realSlug}
      LIMIT 1
    `) as EntryRow[];
    return rows[0] ? rowToEntry(rows[0]) : null;
  }

  const rows = (await db`
    SELECT id, type, slug, title, excerpt, content, content_format, status,
           published, cover_image, featured, tags, sort_order, meta, date,
           created_at, updated_at
    FROM cms_entries
    WHERE type = ${type} AND slug = ${realSlug} AND published = true
    LIMIT 1
  `) as EntryRow[];
  return rows[0] ? rowToEntry(rows[0]) : null;
}

export async function countEntriesByType(
  includeDrafts = false
): Promise<Record<CmsEntryType, number>> {
  await ensureCmsSchema();
  const db = getSql();
  const rows = includeDrafts
    ? ((await db`
        SELECT type, COUNT(*)::int AS count
        FROM cms_entries
        GROUP BY type
      `) as { type: CmsEntryType; count: number }[])
    : ((await db`
        SELECT type, COUNT(*)::int AS count
        FROM cms_entries
        WHERE published = true
        GROUP BY type
      `) as { type: CmsEntryType; count: number }[]);

  const base: Record<CmsEntryType, number> = {
    project: 0,
    page: 0,
    note: 0,
    media: 0,
  };
  for (const row of rows) {
    base[row.type] = row.count;
  }
  return base;
}

export async function createEntry(input: CmsEntryInput): Promise<CmsEntry> {
  await ensureCmsSchema();
  const db = getSql();

  const title = input.title.trim();
  if (!title) throw new Error("Title is required");
  if (!input.type) throw new Error("Type is required");

  let slug = (input.slug || slugify(title)).trim();
  if (!slug) throw new Error("Could not derive a valid slug");
  slug = slugify(slug) || slug;

  const existing = (await db`
    SELECT slug FROM cms_entries
    WHERE type = ${input.type} AND slug = ${slug}
    LIMIT 1
  `) as { slug: string }[];
  if (existing[0]) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const status: CmsStatus =
    input.status || (input.published === false ? "draft" : "published");
  const published =
    input.published !== undefined ? input.published : status === "published";
  const date = input.date || new Date().toISOString().slice(0, 10);
  const tags = input.tags || [];
  const meta: CmsMeta = { ...(input.meta || {}) };
  const contentFormat = input.contentFormat || "html";
  const content = input.content ?? "";
  const excerpt = input.excerpt?.trim() || "";
  const coverImage = input.coverImage ?? null;
  const featured = Boolean(input.featured);
  const sortOrder = input.sortOrder ?? 0;

  // Media entries need a URL in meta
  if (input.type === "media" && !meta.url && !content) {
    throw new Error("Media entries require a URL");
  }
  if (input.type === "media" && !meta.url && content) {
    meta.url = content;
  }

  const rows = (await db`
    INSERT INTO cms_entries (
      type, slug, title, excerpt, content, content_format, status, published,
      cover_image, featured, tags, sort_order, meta, date
    ) VALUES (
      ${input.type},
      ${slug},
      ${title},
      ${excerpt},
      ${content},
      ${contentFormat},
      ${status},
      ${published},
      ${coverImage},
      ${featured},
      ${tags},
      ${sortOrder},
      ${meta as unknown as string},
      ${date}
    )
    RETURNING id, type, slug, title, excerpt, content, content_format, status,
              published, cover_image, featured, tags, sort_order, meta, date,
              created_at, updated_at
  `) as EntryRow[];

  return rowToEntry(rows[0]);
}

export async function updateEntry(
  id: string,
  input: Partial<CmsEntryInput> & { newSlug?: string }
): Promise<CmsEntry> {
  await ensureCmsSchema();
  const db = getSql();

  const current = await getEntryById(id);
  if (!current) throw new Error("Entry not found");

  const title = input.title?.trim() ?? current.title;
  const excerpt =
    input.excerpt !== undefined ? input.excerpt.trim() : current.excerpt;
  const content = input.content !== undefined ? input.content : current.content;
  const contentFormat = input.contentFormat ?? current.contentFormat;
  const date = input.date || current.date;
  const tags = input.tags ?? current.tags;
  const coverImage =
    input.coverImage !== undefined ? input.coverImage : current.coverImage;
  const featured =
    input.featured !== undefined ? input.featured : current.featured;
  const sortOrder =
    input.sortOrder !== undefined ? input.sortOrder : current.sortOrder;
  const meta =
    input.meta !== undefined
      ? { ...current.meta, ...input.meta }
      : current.meta;

  let nextSlug = input.newSlug?.trim() || input.slug?.trim() || current.slug;
  if (nextSlug !== current.slug) {
    nextSlug = slugify(nextSlug) || current.slug;
    const clash = (await db`
      SELECT slug FROM cms_entries
      WHERE type = ${current.type} AND slug = ${nextSlug} AND id <> ${id}
      LIMIT 1
    `) as { slug: string }[];
    if (clash[0]) throw new Error("Slug already in use for this type");
  }

  let finalStatus: CmsStatus = current.status;
  if (input.status) {
    finalStatus = input.status;
  } else if (input.published === true) {
    finalStatus = "published";
  } else if (input.published === false) {
    finalStatus = "draft";
  }

  const finalPublished =
    input.published !== undefined
      ? input.published
      : finalStatus === "published";

  const rows = (await db`
    UPDATE cms_entries SET
      slug = ${nextSlug},
      title = ${title},
      excerpt = ${excerpt},
      content = ${content},
      content_format = ${contentFormat},
      status = ${finalStatus},
      published = ${finalPublished},
      cover_image = ${coverImage ?? null},
      featured = ${featured},
      tags = ${tags},
      sort_order = ${sortOrder},
      meta = ${meta as unknown as string},
      date = ${date},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, type, slug, title, excerpt, content, content_format, status,
              published, cover_image, featured, tags, sort_order, meta, date,
              created_at, updated_at
  `) as EntryRow[];

  if (!rows[0]) throw new Error("Failed to update entry");
  return rowToEntry(rows[0]);
}

export async function deleteEntry(id: string): Promise<boolean> {
  await ensureCmsSchema();
  const db = getSql();
  const rows = (await db`
    DELETE FROM cms_entries WHERE id = ${id}
    RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}

export async function duplicateEntry(id: string): Promise<CmsEntry> {
  const source = await getEntryById(id);
  if (!source) throw new Error("Entry not found");
  return createEntry({
    type: source.type,
    title: `${source.title} (copy)`,
    slug: `${source.slug}-copy`,
    excerpt: source.excerpt,
    content: source.content,
    contentFormat: source.contentFormat,
    status: "draft",
    published: false,
    coverImage: source.coverImage,
    featured: false,
    tags: source.tags,
    sortOrder: source.sortOrder,
    meta: source.meta,
    date: new Date().toISOString().slice(0, 10),
  });
}

/** Public helpers used by the portfolio site. */
export async function getPublishedProjects(): Promise<CmsEntry[]> {
  return listEntries("project", { includeDrafts: false });
}

export async function getPublishedPages(): Promise<CmsEntry[]> {
  return listEntries("page", { includeDrafts: false });
}

export async function getPublishedNotes(): Promise<CmsEntry[]> {
  return listEntries("note", { includeDrafts: false });
}
