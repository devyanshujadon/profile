"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Editor from "@/components/Editor";
import type { BlogPost } from "@/lib/blog";

type Mode = "list" | "create" | "edit";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Tech",
  tags: "",
  published: true,
  date: new Date().toISOString().slice(0, 10),
  content: "",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<Mode>("list");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadPosts = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/blog?drafts=1");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts || []);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load posts",
      });
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    if (session) loadPosts();
  }, [session, loadPosts]);

  const resetForm = () => {
    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setEditingSlug(null);
  };

  const startCreate = () => {
    resetForm();
    setMode("create");
    setMessage(null);
  };

  const startEdit = async (slug: string) => {
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load post");
      const post = data.post as BlogPost;
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        category: post.category,
        tags: (post.tags || []).join(", "),
        published: post.published,
        date: post.date,
        content: post.contentHtml || "",
      });
      setEditingSlug(post.slug);
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

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete “${slug}”? This cannot be undone.`)) return;
    setMessage(null);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setMessage({ type: "success", text: "Post deleted." });
      if (editingSlug === slug) {
        resetForm();
        setMode("list");
      }
      await loadPosts();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published: form.published,
      date: form.date,
      content: form.content,
      contentFormat: "html" as const,
    };

    try {
      const isEdit = mode === "edit" && editingSlug;
      const res = await fetch(
        isEdit
          ? `/api/blog/${encodeURIComponent(editingSlug)}`
          : "/api/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isEdit
              ? { ...payload, newSlug: form.slug || undefined }
              : payload
          ),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      const slug = data.slug || data.post?.slug;
      setMessage({
        type: "success",
        text: isEdit
          ? `Updated “${slug}”.`
          : `Created “${slug}”. Live at /journal/${slug} (or blog.devyanshu.com/${slug}).`,
      });
      await loadPosts();
      setMode("list");
      resetForm();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
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
        <h1 className="text-2xl font-display text-ink mb-3">Blog admin</h1>
        <p className="text-ink-2 text-sm leading-relaxed mb-8">
          Sign in with GitHub to create and edit posts stored in Postgres.
        </p>
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

  return (
    <div className="max-w-3xl mx-auto py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <p className="label mb-2">CMS</p>
          <h1 className="text-3xl font-display text-ink tracking-tight">
            Blog admin
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-ink-3">{session.user?.name}</span>
          <button
            type="button"
            onClick={() => signOut()}
            className="text-ink-2 hover:text-ink transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-8 rounded-lg border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-line bg-mark-soft text-mark"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {mode === "list" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-ink-3">
              {loadingList
                ? "Loading…"
                : `${posts.length} post${posts.length === 1 ? "" : "s"}`}
            </p>
            <button type="button" onClick={startCreate} className="btn-primary">
              New post
            </button>
          </div>

          <div className="divide-y divide-[var(--color-line)] border-t border-line">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3 mb-1">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>{post.category}</span>
                    <span
                      className={
                        post.published ? "text-mark" : "text-ink-3"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h2 className="font-display text-xl text-ink tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-3 font-mono">
                    /{post.slug}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(post.slug)}
                    className="text-mark hover:text-ink transition-colors"
                  >
                    Edit
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
                    onClick={() => handleDelete(post.slug)}
                    className="text-red-700/80 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!loadingList && posts.length === 0 && (
              <p className="py-10 text-ink-3 text-sm">
                No posts yet. Create your first one.
              </p>
            )}
          </div>
        </>
      )}

      {(mode === "create" || mode === "edit") && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink tracking-tight">
              {mode === "edit" ? "Edit post" : "New post"}
            </h2>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setMode("list");
                setMessage(null);
              }}
              className="text-sm text-ink-2 hover:text-ink transition-colors"
            >
              ← Back to list
            </button>
          </div>

          <div className="surface-card p-5 sm:p-6 space-y-5">
            <div>
              <label className="label mb-2 block">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
                className="w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink placeholder:text-ink-3 focus:outline-none focus:border-line-2"
                placeholder="Post title"
              />
            </div>

            <div>
              <label className="label mb-2 block">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                className="w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink font-mono text-sm placeholder:text-ink-3 focus:outline-none focus:border-line-2"
                placeholder="auto-from-title"
              />
            </div>

            <div>
              <label className="label mb-2 block">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                rows={2}
                className="w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink placeholder:text-ink-3 focus:outline-none focus:border-line-2 resize-none"
                placeholder="Short summary for the index"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="label mb-2 block">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink focus:outline-none focus:border-line-2"
                />
              </div>
              <div>
                <label className="label mb-2 block">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink focus:outline-none focus:border-line-2"
                />
              </div>
              <div>
                <label className="label mb-2 block">Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tags: e.target.value }))
                  }
                  className="w-full bg-canvas border border-line rounded-md px-3 py-2.5 text-ink placeholder:text-ink-3 focus:outline-none focus:border-line-2"
                  placeholder="ai, backend"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm((f) => ({ ...f, published: e.target.checked }))
                }
                className="rounded border-line"
              />
              Published
            </label>
          </div>

          <div className="surface-card p-5 sm:p-6">
            <label className="label mb-3 block">Content</label>
            <Editor
              key={editingSlug || "new"}
              content={form.content}
              onChange={(content) => setForm((f) => ({ ...f, content }))}
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
              onClick={() => {
                resetForm();
                setMode("list");
              }}
              className="btn-line"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
