"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Editor from "@/components/Editor";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          category,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          published,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setMessage({ type: "success", text: `Post created successfully! View at /blog/${data.slug}` });
      setTitle("");
      setExcerpt("");
      setCategory("Tech");
      setTags("");
      setPublished(true);
      setContent("");
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to create post" });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-line border-t-signal rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto py-20 glass rounded-3xl p-8 text-center">
        <h1 className="text-2xl font-display text-snow mb-3">Workspace Access</h1>
        <p className="text-fog font-light mb-8 text-sm leading-relaxed">
          Authentication is required to access the authoring tools and workspace.
        </p>
        <button onClick={() => signIn("github")} className="btn-primary w-full">
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
        <h1 className="text-3xl font-display text-snow">Workspace</h1>
        <div className="flex items-center gap-4 glass rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-signal" />
          <span className="text-xs font-medium text-mist">{session.user?.name}</span>
          <div className="w-px h-4 bg-white/15" />
          <button
            onClick={() => signOut()}
            className="text-xs font-medium text-fog hover:text-snow transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 mb-8 rounded-2xl text-sm font-medium border ${
            message.type === "success"
              ? "border-signal/40 bg-signal-dim text-signal"
              : "border-red-400/40 bg-red-500/10 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-3xl p-6 space-y-5">
          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-fog mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-void/50 border border-line rounded-xl px-4 py-3 text-snow placeholder:text-fog/50 focus:outline-none focus:border-signal/50"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-fog mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full bg-void/50 border border-line rounded-xl px-4 py-3 text-snow placeholder:text-fog/50 focus:outline-none focus:border-signal/50 resize-none"
              placeholder="Short summary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-fog mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-void/50 border border-line rounded-xl px-4 py-3 text-snow focus:outline-none focus:border-signal/50"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-fog mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-void/50 border border-line rounded-xl px-4 py-3 text-snow placeholder:text-fog/50 focus:outline-none focus:border-signal/50"
                placeholder="nextjs, ai, product"
              />
            </div>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-mist cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-line"
            />
            Published
          </label>
        </div>

        <div className="glass rounded-3xl p-6">
          <label className="block font-mono text-[10px] tracking-widest uppercase text-fog mb-3">
            Content
          </label>
          <Editor content={content} onChange={setContent} />
        </div>

        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? "Creating…" : "Create post"}
        </button>
      </form>
    </div>
  );
}
