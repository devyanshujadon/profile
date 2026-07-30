"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Editor from "@/components/Editor";
import type { BlogPost } from "@/lib/blog";
import type { CmsEntry, CmsEntryType } from "@/lib/cms";
import {
  type CmsSection,
  type EditorMode,
  type EntryFormState,
  type Message,
  type PostFormState,
  emptyEntryForm,
  emptyPostForm,
  entryToForm,
  postToForm,
  SECTION_META,
} from "./types";

type Stats = {
  posts: number;
  publishedPosts: number;
  drafts: number;
  project: number;
  page: number;
  note: number;
  media: number;
};

const SECTIONS: CmsSection[] = [
  "dashboard",
  "posts",
  "projects",
  "pages",
  "notes",
  "media",
];

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function statusBadge(published: boolean, status?: string) {
  if (status === "archived") {
    return (
      <span className="text-ink-3 text-xs font-mono uppercase tracking-wide">
        Archived
      </span>
    );
  }
  if (published || status === "published") {
    return (
      <span className="text-mark text-xs font-mono uppercase tracking-wide">
        Published
      </span>
    );
  }
  return (
    <span className="text-amber-800/80 text-xs font-mono uppercase tracking-wide">
      Draft
    </span>
  );
}

export default function AdminDashboard() {
  const { data: session, status: authStatus } = useSession();
  const searchParams = useSearchParams();
  const accessDenied = searchParams.get("error") === "AccessDenied";

  const [section, setSection] = useState<CmsSection>("dashboard");
  const [mode, setMode] = useState<EditorMode>("list");
  const [message, setMessage] = useState<Message | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCreateOnSection, setOpenCreateOnSection] =
    useState<CmsSection | null>(null);

  const [stats, setStats] = useState<Stats | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [entries, setEntries] = useState<CmsEntry[]>([]);

  const [postForm, setPostForm] = useState<PostFormState>(emptyPostForm);
  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);

  const [entryForm, setEntryForm] = useState<EntryFormState>(
    emptyEntryForm("project")
  );
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const entryType: CmsEntryType | null =
    SECTION_META[section].type ?? null;

  const loadStats = useCallback(async () => {
    const res = await fetch("/api/cms?stats=1");
    const data = await res.json();
    if (res.ok) setStats(data.stats);
  }, []);

  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/blog?drafts=1");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load posts");
    setPosts(data.posts || []);
  }, []);

  const loadEntries = useCallback(
    async (type: CmsEntryType, q?: string) => {
      const params = new URLSearchParams({ type });
      if (q) params.set("q", q);
      const res = await fetch(`/api/cms?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load entries");
      setEntries(data.entries || []);
    },
    []
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (section === "dashboard") {
        await loadStats();
      } else if (section === "posts") {
        await loadPosts();
      } else if (entryType) {
        await loadEntries(entryType, search || undefined);
      }
      // Always keep stats somewhat fresh for the sidebar counts
      if (section !== "dashboard") {
        loadStats().catch(() => {});
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load",
      });
    } finally {
      setLoading(false);
    }
  }, [section, entryType, search, loadStats, loadPosts, loadEntries]);

  useEffect(() => {
    if (session?.isAdmin) {
      refresh();
    }
  }, [session, refresh]);

  // Reset editor when switching sections (optionally open create form)
  useEffect(() => {
    setEditingPostSlug(null);
    setEditingEntryId(null);
    setPostForm(emptyPostForm());
    if (entryType) setEntryForm(emptyEntryForm(entryType));
    setSearch("");
    setMessage(null);
    if (openCreateOnSection === section) {
      setMode("create");
      setOpenCreateOnSection(null);
    } else {
      setMode("list");
    }
    // Only re-run on section change; openCreateOnSection is read from the
    // same batched update that sets section (quick actions).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, search]);

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.slug.toLowerCase().includes(q) ||
        e.excerpt.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [entries, search]);

  // ── Auth gates ──────────────────────────────────────────────────────────
  if (authStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-5 h-5 border-2 border-line border-t-mark rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto py-16 surface-card p-8 text-center">
        <p className="label mb-3">CMS</p>
        <h1 className="text-2xl font-display text-ink mb-3">Content studio</h1>
        <p className="text-ink-2 text-sm leading-relaxed mb-6">
          Sign in with GitHub to manage posts, projects, pages, notes, and
          media. Only allowlisted accounts can access the CMS.
        </p>
        {accessDenied && (
          <p className="mb-6 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            That GitHub account is not authorized to use the admin CMS.
          </p>
        )}
        <button
          type="button"
          onClick={() => signIn("github")}
          className="btn-primary w-full"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  if (!session.isAdmin) {
    return (
      <div className="max-w-md mx-auto py-16 surface-card p-8 text-center">
        <p className="label mb-3">CMS</p>
        <h1 className="text-2xl font-display text-ink mb-3">Access denied</h1>
        <p className="text-ink-2 text-sm leading-relaxed mb-6">
          Signed in as{" "}
          <span className="font-mono text-ink">
            {session.githubLogin || session.user?.name || "unknown"}
          </span>
          , which is not on the admin allowlist.
        </p>
        <button
          type="button"
          onClick={() => signOut()}
          className="btn-primary w-full"
        >
          Sign out
        </button>
      </div>
    );
  }

  // ── Post actions ────────────────────────────────────────────────────────
  const startCreatePost = () => {
    setPostForm(emptyPostForm());
    setEditingPostSlug(null);
    setMode("create");
    setMessage(null);
  };

  const startEditPost = async (slug: string) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load post");
      setPostForm(postToForm(data.post as BlogPost));
      setEditingPostSlug(data.post.slug);
      setMode("edit");
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load post",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm(`Delete “${slug}”? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setMessage({ type: "success", text: "Post deleted." });
      if (editingPostSlug === slug) {
        setMode("list");
        setEditingPostSlug(null);
      }
      await loadPosts();
      loadStats().catch(() => {});
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete",
      });
    }
  };

  const handleDuplicatePost = async (slug: string) => {
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "duplicate" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to duplicate");
      setMessage({
        type: "success",
        text: `Duplicated as draft “${data.slug}”.`,
      });
      await loadPosts();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to duplicate",
      });
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      title: postForm.title,
      slug: postForm.slug || undefined,
      excerpt: postForm.excerpt,
      category: postForm.category,
      tags: parseTags(postForm.tags),
      published: postForm.status === "published",
      status: postForm.status,
      date: postForm.date,
      content: postForm.content,
      contentFormat: "html" as const,
      coverImage: postForm.coverImage || null,
      featured: postForm.featured,
      seoTitle: postForm.seoTitle || null,
      seoDescription: postForm.seoDescription || null,
    };

    try {
      const isEdit = mode === "edit" && editingPostSlug;
      const res = await fetch(
        isEdit
          ? `/api/blog/${encodeURIComponent(editingPostSlug)}`
          : "/api/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isEdit
              ? { ...payload, newSlug: postForm.slug || undefined }
              : payload
          ),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMessage({
        type: "success",
        text: isEdit
          ? `Updated “${data.slug}”.`
          : `Created “${data.slug}”.`,
      });
      await loadPosts();
      setMode("list");
      setPostForm(emptyPostForm());
      setEditingPostSlug(null);
      loadStats().catch(() => {});
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  // ── Entry actions (projects, pages, notes, media) ───────────────────────
  const startCreateEntry = () => {
    if (!entryType) return;
    setEntryForm(emptyEntryForm(entryType));
    setEditingEntryId(null);
    setMode("create");
    setMessage(null);
  };

  const startEditEntry = async (id: string) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/cms/${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setEntryForm(entryToForm(data.entry as CmsEntry));
      setEditingEntryId(data.entry.id);
      setMode("edit");
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async (id: string, title: string) => {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/cms/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setMessage({ type: "success", text: "Deleted." });
      if (editingEntryId === id) {
        setMode("list");
        setEditingEntryId(null);
      }
      if (entryType) await loadEntries(entryType, search || undefined);
      loadStats().catch(() => {});
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete",
      });
    }
  };

  const handleDuplicateEntry = async (id: string) => {
    try {
      const res = await fetch(`/api/cms/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "duplicate" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to duplicate");
      setMessage({ type: "success", text: "Duplicated as draft." });
      if (entryType) await loadEntries(entryType, search || undefined);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to duplicate",
      });
    }
  };

  const buildMeta = (type: CmsEntryType, form: EntryFormState) => {
    if (type === "project") {
      return {
        year: form.year,
        tag: form.tag,
        href: form.href,
        linkLabel: form.linkLabel || form.href.replace(/^https?:\/\//, ""),
        stack: form.stack,
        points: form.points
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean),
      };
    }
    if (type === "media") {
      return {
        url: form.url,
        alt: form.alt,
        mimeType: form.mimeType,
        source: form.source,
      };
    }
    if (type === "page") {
      return {
        template: form.template,
        showInNav: form.showInNav,
      };
    }
    if (type === "note") {
      return { pinned: form.pinned };
    }
    return {};
  };

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryType) return;
    setSaving(true);
    setMessage(null);

    const meta = buildMeta(entryType, entryForm);
    const payload = {
      type: entryType,
      title: entryForm.title,
      slug: entryForm.slug || undefined,
      excerpt: entryForm.excerpt,
      content:
        entryType === "media" ? entryForm.url : entryForm.content,
      contentFormat:
        entryType === "media"
          ? ("plain" as const)
          : entryType === "note"
            ? ("html" as const)
            : ("html" as const),
      status: entryForm.status,
      published: entryForm.status === "published",
      date: entryForm.date,
      coverImage: entryForm.coverImage || null,
      featured: entryForm.featured,
      tags: parseTags(entryForm.tags),
      sortOrder: Number(entryForm.sortOrder) || 0,
      meta,
    };

    try {
      const isEdit = mode === "edit" && editingEntryId;
      const res = await fetch(
        isEdit ? `/api/cms/${encodeURIComponent(editingEntryId)}` : "/api/cms",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isEdit
              ? { ...payload, newSlug: entryForm.slug || undefined }
              : payload
          ),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMessage({
        type: "success",
        text: isEdit ? "Updated." : `Created “${data.entry?.title}”.`,
      });
      await loadEntries(entryType);
      setMode("list");
      setEntryForm(emptyEntryForm(entryType));
      setEditingEntryId(null);
      loadStats().catch(() => {});
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const backToList = () => {
    setMode("list");
    setEditingPostSlug(null);
    setEditingEntryId(null);
    setMessage(null);
  };

  // ── Render helpers ──────────────────────────────────────────────────────
  const field = "w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink placeholder:text-ink-3 focus:outline-none focus:border-line-2";
  const label = "label mb-2 block";

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="label mb-2">CMS</p>
          <h1 className="text-3xl font-display text-ink tracking-tight">
            Content studio
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/"
            className="text-ink-2 hover:text-ink transition-colors"
          >
            ← Site
          </Link>
          <span className="text-ink-3">
            {session.user?.name || session.githubLogin}
          </span>
          <button
            type="button"
            onClick={() => signOut()}
            className="text-ink-2 hover:text-ink transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-10">
        {/* Sidebar */}
        <nav className="lg:sticky lg:top-8 self-start space-y-1">
          {SECTIONS.map((s) => {
            const count =
              s === "posts"
                ? stats?.posts
                : s === "dashboard"
                  ? undefined
                  : stats?.[SECTION_META[s].type as keyof Stats];
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSection(s)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                  section === s
                    ? "bg-mark-soft text-mark font-medium"
                    : "text-ink-2 hover:bg-canvas-2 hover:text-ink"
                }`}
              >
                <span>{SECTION_META[s].label}</span>
                {typeof count === "number" && (
                  <span className="font-mono text-xs text-ink-3">{count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Main */}
        <div className="min-w-0">
          {message && (
            <div
              className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border-line bg-mark-soft text-mark"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* ── Dashboard ─────────────────────────────────────────────── */}
          {section === "dashboard" && mode === "list" && (
            <div>
              <p className="text-sm text-ink-3 mb-6">
                {SECTION_META.dashboard.description}
              </p>
              {loading && !stats ? (
                <div className="h-24 animate-pulse bg-panel rounded-lg" />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                  {(
                    [
                      ["posts", "Posts", stats?.posts ?? 0],
                      ["projects", "Projects", stats?.project ?? 0],
                      ["pages", "Pages", stats?.page ?? 0],
                      ["notes", "Notes", stats?.note ?? 0],
                      ["media", "Media", stats?.media ?? 0],
                      ["posts", "Drafts", stats?.drafts ?? 0],
                    ] as const
                  ).map(([target, labelText, count]) => (
                    <button
                      key={labelText}
                      type="button"
                      onClick={() => setSection(target)}
                      className="surface-card p-4 text-left hover:border-line-2 transition-colors"
                    >
                      <p className="font-mono text-2xl text-ink tabular-nums">
                        {count}
                      </p>
                      <p className="text-sm text-ink-3 mt-1">{labelText}</p>
                    </button>
                  ))}
                </div>
              )}
              <div className="surface-card p-5 sm:p-6 space-y-3">
                <h2 className="font-display text-lg text-ink">Quick actions</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setOpenCreateOnSection("posts");
                      setSection("posts");
                    }}
                  >
                    New post
                  </button>
                  <button
                    type="button"
                    className="btn-line"
                    onClick={() => {
                      setOpenCreateOnSection("projects");
                      setSection("projects");
                    }}
                  >
                    New project
                  </button>
                  <button
                    type="button"
                    className="btn-line"
                    onClick={() => {
                      setOpenCreateOnSection("media");
                      setSection("media");
                    }}
                  >
                    Add media
                  </button>
                </div>
                <p className="text-xs text-ink-3 pt-2 leading-relaxed">
                  Posts power the journal at blog.devyanshu.com. Projects appear
                  on the portfolio homepage. Pages, notes, and media are ready
                  for you to attach wherever you need them.
                </p>
              </div>
            </div>
          )}

          {/* ── Posts list ────────────────────────────────────────────── */}
          {section === "posts" && mode === "list" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="font-display text-2xl text-ink tracking-tight">
                    Posts
                  </h2>
                  <p className="text-sm text-ink-3 mt-1">
                    {loading
                      ? "Loading…"
                      : `${filteredPosts.length} post${filteredPosts.length === 1 ? "" : "s"}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startCreatePost}
                  className="btn-primary"
                >
                  New post
                </button>
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts…"
                className={`${field} mb-4`}
              />

              <div className="divide-y divide-[var(--color-line)] border-t border-line">
                {filteredPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3 mb-1">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>{post.category}</span>
                        {statusBadge(post.published, post.status)}
                        {post.featured && (
                          <span className="text-mark text-xs">★ Featured</span>
                        )}
                      </div>
                      <h3 className="font-display text-xl text-ink tracking-tight">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-3 font-mono">
                        /{post.slug}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm shrink-0">
                      <button
                        type="button"
                        onClick={() => startEditPost(post.slug)}
                        className="text-mark hover:text-ink transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDuplicatePost(post.slug)}
                        className="text-ink-2 hover:text-ink transition-colors"
                      >
                        Duplicate
                      </button>
                      <Link
                        href={`https://blog.devyanshu.com/${post.slug}`}
                        target="_blank"
                        className="text-ink-2 hover:text-ink transition-colors"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.slug)}
                        className="text-red-700/80 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!loading && filteredPosts.length === 0 && (
                  <p className="py-10 text-ink-3 text-sm">
                    No posts yet. Create your first one.
                  </p>
                )}
              </div>
            </>
          )}

          {/* ── Post form ─────────────────────────────────────────────── */}
          {section === "posts" && (mode === "create" || mode === "edit") && (
            <form onSubmit={handleSubmitPost} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-ink tracking-tight">
                  {mode === "edit" ? "Edit post" : "New post"}
                </h2>
                <button
                  type="button"
                  onClick={backToList}
                  className="text-sm text-ink-2 hover:text-ink transition-colors"
                >
                  ← Back
                </button>
              </div>

              <div className="surface-card p-5 sm:p-6 space-y-5">
                <div>
                  <label className={label}>Title</label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) =>
                      setPostForm((f) => ({ ...f, title: e.target.value }))
                    }
                    required
                    className={field}
                    placeholder="Post title"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={label}>Slug</label>
                    <input
                      type="text"
                      value={postForm.slug}
                      onChange={(e) =>
                        setPostForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      className={`${field} font-mono text-sm`}
                      placeholder="auto-from-title"
                    />
                  </div>
                  <div>
                    <label className={label}>Status</label>
                    <select
                      value={postForm.status}
                      onChange={(e) =>
                        setPostForm((f) => ({
                          ...f,
                          status: e.target.value as PostFormState["status"],
                          published: e.target.value === "published",
                        }))
                      }
                      className={field}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={label}>Excerpt</label>
                  <textarea
                    value={postForm.excerpt}
                    onChange={(e) =>
                      setPostForm((f) => ({ ...f, excerpt: e.target.value }))
                    }
                    rows={2}
                    className={`${field} resize-none`}
                    placeholder="Short summary for the index"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={label}>Category</label>
                    <input
                      type="text"
                      value={postForm.category}
                      onChange={(e) =>
                        setPostForm((f) => ({
                          ...f,
                          category: e.target.value,
                        }))
                      }
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label}>Date</label>
                    <input
                      type="date"
                      value={postForm.date}
                      onChange={(e) =>
                        setPostForm((f) => ({ ...f, date: e.target.value }))
                      }
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label}>Tags</label>
                    <input
                      type="text"
                      value={postForm.tags}
                      onChange={(e) =>
                        setPostForm((f) => ({ ...f, tags: e.target.value }))
                      }
                      className={field}
                      placeholder="ai, backend"
                    />
                  </div>
                </div>

                <div>
                  <label className={label}>Cover image URL</label>
                  <input
                    type="url"
                    value={postForm.coverImage}
                    onChange={(e) =>
                      setPostForm((f) => ({
                        ...f,
                        coverImage: e.target.value,
                      }))
                    }
                    className={field}
                    placeholder="https://…"
                  />
                  {postForm.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={postForm.coverImage}
                      alt=""
                      className="mt-2 h-28 rounded-md object-cover border border-line"
                    />
                  )}
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postForm.featured}
                    onChange={(e) =>
                      setPostForm((f) => ({
                        ...f,
                        featured: e.target.checked,
                      }))
                    }
                    className="rounded border-line"
                  />
                  Featured on index
                </label>
              </div>

              <div className="surface-card p-5 sm:p-6 space-y-4">
                <p className="label">SEO</p>
                <div>
                  <label className={label}>SEO title</label>
                  <input
                    type="text"
                    value={postForm.seoTitle}
                    onChange={(e) =>
                      setPostForm((f) => ({ ...f, seoTitle: e.target.value }))
                    }
                    className={field}
                    placeholder="Defaults to post title"
                  />
                </div>
                <div>
                  <label className={label}>SEO description</label>
                  <textarea
                    value={postForm.seoDescription}
                    onChange={(e) =>
                      setPostForm((f) => ({
                        ...f,
                        seoDescription: e.target.value,
                      }))
                    }
                    rows={2}
                    className={`${field} resize-none`}
                    placeholder="Defaults to excerpt"
                  />
                </div>
              </div>

              <div className="surface-card p-5 sm:p-6">
                <label className={`${label} mb-3`}>Content</label>
                <Editor
                  key={editingPostSlug || "new-post"}
                  content={postForm.content}
                  onChange={(content) =>
                    setPostForm((f) => ({ ...f, content }))
                  }
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:opacity-50"
                >
                  {saving
                    ? "Saving…"
                    : mode === "edit"
                      ? "Update post"
                      : "Create post"}
                </button>
                <button
                  type="button"
                  onClick={backToList}
                  className="btn-line"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* ── Generic entries list ──────────────────────────────────── */}
          {entryType && mode === "list" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="font-display text-2xl text-ink tracking-tight">
                    {SECTION_META[section].label}
                  </h2>
                  <p className="text-sm text-ink-3 mt-1">
                    {SECTION_META[section].description}
                    {!loading && ` · ${entries.length}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startCreateEntry}
                  className="btn-primary"
                >
                  New {entryType}
                </button>
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${entryType}s…`}
                className={`${field} mb-4`}
              />

              {entryType === "media" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredEntries.map((entry) => {
                    const url = String(entry.meta?.url || entry.content || "");
                    return (
                      <div
                        key={entry.id}
                        className="surface-card overflow-hidden group"
                      >
                        <div className="aspect-video bg-panel flex items-center justify-center overflow-hidden">
                          {url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={url}
                              alt={String(entry.meta?.alt || entry.title)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-ink-3 text-xs">No URL</span>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-ink font-medium truncate">
                            {entry.title}
                          </p>
                          <div className="flex gap-2 mt-2 text-xs">
                            <button
                              type="button"
                              onClick={() => startEditEntry(entry.id)}
                              className="text-mark"
                            >
                              Edit
                            </button>
                            {url && (
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(url);
                                  setMessage({
                                    type: "success",
                                    text: "URL copied.",
                                  });
                                }}
                                className="text-ink-2"
                              >
                                Copy URL
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteEntry(entry.id, entry.title)
                              }
                              className="text-red-700/80"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {!loading && filteredEntries.length === 0 && (
                    <p className="col-span-full py-10 text-ink-3 text-sm">
                      No media yet. Add an image by URL.
                    </p>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-line)] border-t border-line">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3 mb-1">
                          <time dateTime={entry.date}>{entry.date}</time>
                          {statusBadge(entry.published, entry.status)}
                          {entry.featured && (
                            <span className="text-mark text-xs">
                              ★ Featured
                            </span>
                          )}
                          {entryType === "project" && entry.meta?.tag && (
                            <span>{String(entry.meta.tag)}</span>
                          )}
                        </div>
                        <h3 className="font-display text-xl text-ink tracking-tight">
                          {entry.title}
                        </h3>
                        {entry.excerpt && (
                          <p className="mt-1 text-sm text-ink-2 line-clamp-2">
                            {entry.excerpt}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-ink-3 font-mono">
                          /{entry.slug}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm shrink-0">
                        <button
                          type="button"
                          onClick={() => startEditEntry(entry.id)}
                          className="text-mark hover:text-ink transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateEntry(entry.id)}
                          className="text-ink-2 hover:text-ink transition-colors"
                        >
                          Duplicate
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteEntry(entry.id, entry.title)
                          }
                          className="text-red-700/80 hover:text-red-800 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {!loading && filteredEntries.length === 0 && (
                    <p className="py-10 text-ink-3 text-sm">
                      Nothing here yet. Create your first{" "}
                      {entryType}.
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* ── Generic entry form ────────────────────────────────────── */}
          {entryType && (mode === "create" || mode === "edit") && (
            <form onSubmit={handleSubmitEntry} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-ink tracking-tight">
                  {mode === "edit" ? `Edit ${entryType}` : `New ${entryType}`}
                </h2>
                <button
                  type="button"
                  onClick={backToList}
                  className="text-sm text-ink-2 hover:text-ink transition-colors"
                >
                  ← Back
                </button>
              </div>

              <div className="surface-card p-5 sm:p-6 space-y-5">
                <div>
                  <label className={label}>Title</label>
                  <input
                    type="text"
                    value={entryForm.title}
                    onChange={(e) =>
                      setEntryForm((f) => ({ ...f, title: e.target.value }))
                    }
                    required
                    className={field}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={label}>Slug</label>
                    <input
                      type="text"
                      value={entryForm.slug}
                      onChange={(e) =>
                        setEntryForm((f) => ({ ...f, slug: e.target.value }))
                      }
                      className={`${field} font-mono text-sm`}
                      placeholder="auto-from-title"
                    />
                  </div>
                  <div>
                    <label className={label}>Status</label>
                    <select
                      value={entryForm.status}
                      onChange={(e) =>
                        setEntryForm((f) => ({
                          ...f,
                          status: e.target
                            .value as EntryFormState["status"],
                          published: e.target.value === "published",
                        }))
                      }
                      className={field}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {entryType !== "media" && (
                  <div>
                    <label className={label}>
                      {entryType === "project" ? "Blurb" : "Excerpt"}
                    </label>
                    <textarea
                      value={entryForm.excerpt}
                      onChange={(e) =>
                        setEntryForm((f) => ({
                          ...f,
                          excerpt: e.target.value,
                        }))
                      }
                      rows={2}
                      className={`${field} resize-none`}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={label}>Date</label>
                    <input
                      type="date"
                      value={entryForm.date}
                      onChange={(e) =>
                        setEntryForm((f) => ({ ...f, date: e.target.value }))
                      }
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label}>Sort order</label>
                    <input
                      type="number"
                      value={entryForm.sortOrder}
                      onChange={(e) =>
                        setEntryForm((f) => ({
                          ...f,
                          sortOrder: Number(e.target.value),
                        }))
                      }
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label}>Tags</label>
                    <input
                      type="text"
                      value={entryForm.tags}
                      onChange={(e) =>
                        setEntryForm((f) => ({ ...f, tags: e.target.value }))
                      }
                      className={field}
                      placeholder="comma, separated"
                    />
                  </div>
                </div>

                {entryType !== "media" && (
                  <div>
                    <label className={label}>Cover image URL</label>
                    <input
                      type="url"
                      value={entryForm.coverImage}
                      onChange={(e) =>
                        setEntryForm((f) => ({
                          ...f,
                          coverImage: e.target.value,
                        }))
                      }
                      className={field}
                      placeholder="https://…"
                    />
                  </div>
                )}

                <label className="inline-flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={entryForm.featured}
                    onChange={(e) =>
                      setEntryForm((f) => ({
                        ...f,
                        featured: e.target.checked,
                      }))
                    }
                    className="rounded border-line"
                  />
                  Featured
                </label>

                {/* Project-specific */}
                {entryType === "project" && (
                  <div className="pt-2 border-t border-line space-y-4">
                    <p className="label">Project details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={label}>Year</label>
                        <input
                          type="text"
                          value={entryForm.year}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              year: e.target.value,
                            }))
                          }
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label}>Tag</label>
                        <input
                          type="text"
                          value={entryForm.tag}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              tag: e.target.value,
                            }))
                          }
                          className={field}
                          placeholder="Featured, Live, …"
                        />
                      </div>
                      <div>
                        <label className={label}>URL</label>
                        <input
                          type="url"
                          value={entryForm.href}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              href: e.target.value,
                            }))
                          }
                          className={field}
                          placeholder="https://…"
                        />
                      </div>
                      <div>
                        <label className={label}>Link label</label>
                        <input
                          type="text"
                          value={entryForm.linkLabel}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              linkLabel: e.target.value,
                            }))
                          }
                          className={field}
                          placeholder="example.com"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={label}>Stack</label>
                        <input
                          type="text"
                          value={entryForm.stack}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              stack: e.target.value,
                            }))
                          }
                          className={field}
                          placeholder="Next.js · PostgreSQL"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={label}>
                        Bullet points{" "}
                        <span className="text-ink-3 font-normal">
                          (one per line)
                        </span>
                      </label>
                      <textarea
                        value={entryForm.points}
                        onChange={(e) =>
                          setEntryForm((f) => ({
                            ...f,
                            points: e.target.value,
                          }))
                        }
                        rows={4}
                        className={field}
                        placeholder={"Feature one\nFeature two"}
                      />
                    </div>
                  </div>
                )}

                {/* Media-specific */}
                {entryType === "media" && (
                  <div className="pt-2 border-t border-line space-y-4">
                    <p className="label">Asset</p>
                    <div>
                      <label className={label}>URL</label>
                      <input
                        type="url"
                        value={entryForm.url}
                        onChange={(e) =>
                          setEntryForm((f) => ({
                            ...f,
                            url: e.target.value,
                          }))
                        }
                        required
                        className={field}
                        placeholder="https://…"
                      />
                      {entryForm.url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entryForm.url}
                          alt=""
                          className="mt-2 max-h-40 rounded-md border border-line object-contain"
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={label}>Alt text</label>
                        <input
                          type="text"
                          value={entryForm.alt}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              alt: e.target.value,
                            }))
                          }
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label}>Type</label>
                        <select
                          value={entryForm.mimeType}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              mimeType: e.target.value,
                            }))
                          }
                          className={field}
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                          <option value="audio">Audio</option>
                          <option value="file">File</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={label}>Source / credit</label>
                        <input
                          type="text"
                          value={entryForm.source}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              source: e.target.value,
                            }))
                          }
                          className={field}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Page-specific */}
                {entryType === "page" && (
                  <div className="pt-2 border-t border-line space-y-4">
                    <p className="label">Page options</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={label}>Template</label>
                        <select
                          value={entryForm.template}
                          onChange={(e) =>
                            setEntryForm((f) => ({
                              ...f,
                              template: e.target.value,
                            }))
                          }
                          className={field}
                        >
                          <option value="default">Default</option>
                          <option value="minimal">Minimal</option>
                          <option value="wide">Wide</option>
                        </select>
                      </div>
                      <div className="flex items-end pb-2">
                        <label className="inline-flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={entryForm.showInNav}
                            onChange={(e) =>
                              setEntryForm((f) => ({
                                ...f,
                                showInNav: e.target.checked,
                              }))
                            }
                            className="rounded border-line"
                          />
                          Show in nav
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Note-specific */}
                {entryType === "note" && (
                  <label className="inline-flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={entryForm.pinned}
                      onChange={(e) =>
                        setEntryForm((f) => ({
                          ...f,
                          pinned: e.target.checked,
                        }))
                      }
                      className="rounded border-line"
                    />
                    Pinned
                  </label>
                )}
              </div>

              {entryType !== "media" && entryType !== "project" && (
                <div className="surface-card p-5 sm:p-6">
                  <label className={`${label} mb-3`}>Content</label>
                  <Editor
                    key={editingEntryId || `new-${entryType}`}
                    content={entryForm.content}
                    onChange={(content) =>
                      setEntryForm((f) => ({ ...f, content }))
                    }
                    minHeight={entryType === "note" ? "200px" : "320px"}
                    placeholder={
                      entryType === "note"
                        ? "A short note…"
                        : "Page content…"
                    }
                  />
                </div>
              )}

              {entryType === "project" && (
                <div className="surface-card p-5 sm:p-6">
                  <label className={`${label} mb-3`}>
                    Long description{" "}
                    <span className="text-ink-3 font-normal">(optional)</span>
                  </label>
                  <Editor
                    key={editingEntryId || "new-project"}
                    content={entryForm.content}
                    onChange={(content) =>
                      setEntryForm((f) => ({ ...f, content }))
                    }
                    minHeight="200px"
                    placeholder="Optional longer write-up…"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:opacity-50"
                >
                  {saving
                    ? "Saving…"
                    : mode === "edit"
                      ? "Update"
                      : `Create ${entryType}`}
                </button>
                <button
                  type="button"
                  onClick={backToList}
                  className="btn-line"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
