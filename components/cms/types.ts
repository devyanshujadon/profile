import type { BlogPost } from "@/lib/blog";
import type { CmsEntry, CmsEntryType, CmsStatus } from "@/lib/cms";

export type CmsSection =
  | "dashboard"
  | "posts"
  | "projects"
  | "pages"
  | "notes"
  | "media";

export type EditorMode = "list" | "create" | "edit";

export interface Message {
  type: "success" | "error";
  text: string;
}

export interface PostFormState {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string;
  published: boolean;
  status: "draft" | "published" | "archived";
  date: string;
  content: string;
  coverImage: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface EntryFormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  status: CmsStatus;
  published: boolean;
  date: string;
  coverImage: string;
  featured: boolean;
  sortOrder: number;
  // project
  year: string;
  tag: string;
  href: string;
  linkLabel: string;
  stack: string;
  points: string;
  // media
  url: string;
  alt: string;
  mimeType: string;
  source: string;
  // page
  template: string;
  showInNav: boolean;
  // note
  pinned: boolean;
}

export const emptyPostForm = (): PostFormState => ({
  title: "",
  slug: "",
  excerpt: "",
  category: "Tech",
  tags: "",
  published: true,
  status: "published",
  date: new Date().toISOString().slice(0, 10),
  content: "",
  coverImage: "",
  featured: false,
  seoTitle: "",
  seoDescription: "",
});

export const emptyEntryForm = (type: CmsEntryType): EntryFormState => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  status: type === "media" ? "published" : "draft",
  published: type === "media",
  date: new Date().toISOString().slice(0, 10),
  coverImage: "",
  featured: false,
  sortOrder: 0,
  year: new Date().getFullYear().toString(),
  tag: "Live",
  href: "",
  linkLabel: "",
  stack: "",
  points: "",
  url: "",
  alt: "",
  mimeType: "image",
  source: "",
  template: "default",
  showInNav: false,
  pinned: false,
});

export function postToForm(post: BlogPost): PostFormState {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    tags: (post.tags || []).join(", "),
    published: post.published,
    status: post.status || (post.published ? "published" : "draft"),
    date: post.date,
    content: post.contentHtml || "",
    coverImage: post.coverImage || "",
    featured: Boolean(post.featured),
    seoTitle: post.seoTitle || "",
    seoDescription: post.seoDescription || "",
  };
}

export function entryToForm(entry: CmsEntry): EntryFormState {
  const m = entry.meta || {};
  return {
    title: entry.title,
    slug: entry.slug,
    excerpt: entry.excerpt,
    content: entry.content || "",
    tags: (entry.tags || []).join(", "),
    status: entry.status,
    published: entry.published,
    date: entry.date,
    coverImage: entry.coverImage || "",
    featured: entry.featured,
    sortOrder: entry.sortOrder,
    year: String(m.year || ""),
    tag: String(m.tag || ""),
    href: String(m.href || ""),
    linkLabel: String(m.linkLabel || ""),
    stack: String(m.stack || ""),
    points: Array.isArray(m.points) ? m.points.join("\n") : "",
    url: String(m.url || entry.content || ""),
    alt: String(m.alt || ""),
    mimeType: String(m.mimeType || "image"),
    source: String(m.source || ""),
    template: String(m.template || "default"),
    showInNav: Boolean(m.showInNav),
    pinned: Boolean(m.pinned),
  };
}

export const SECTION_META: Record<
  CmsSection,
  { label: string; description: string; type?: CmsEntryType }
> = {
  dashboard: {
    label: "Dashboard",
    description: "Overview of all content",
  },
  posts: {
    label: "Posts",
    description: "Journal & blog writing",
  },
  projects: {
    label: "Projects",
    description: "Portfolio work",
    type: "project",
  },
  pages: {
    label: "Pages",
    description: "Standalone pages",
    type: "page",
  },
  notes: {
    label: "Notes",
    description: "Short notes & snippets",
    type: "note",
  },
  media: {
    label: "Media",
    description: "Images & assets by URL",
    type: "media",
  },
};
