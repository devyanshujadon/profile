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
        <div className="w-6 h-6 border-2 border-surface-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 mt-12 glass-card text-center">
        <h1 className="text-2xl font-display font-bold mb-3">Workspace Access</h1>
        <p className="text-surface-500 mb-8 text-sm leading-relaxed">Authentication is required to access the authoring tools and workspace.</p>
        <button
          onClick={() => signIn("github")}
          className="px-6 py-3 bg-surface-900 text-white font-medium rounded-xl hover:bg-surface-800 hover:shadow-lg hover:shadow-surface-900/10 transition-all w-full active:scale-95"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
        <h1 className="text-3xl font-display font-bold text-surface-900 mb-4 sm:mb-0">Workspace</h1>
        <div className="flex items-center gap-4 bg-white subtle-border px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-xs font-medium text-surface-600">{session.user?.name}</span>
          <div className="w-px h-4 bg-surface-200"></div>
          <button
            onClick={() => signOut()}
            className="text-xs font-semibold text-surface-500 hover:text-surface-900 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 mb-8 rounded-xl text-sm font-medium border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 sm:p-10">
        <div>
          <label className="block text-sm font-semibold mb-2 text-surface-900">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all rounded-xl placeholder:text-surface-400"
            placeholder="An interesting title..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-surface-900">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all rounded-xl placeholder:text-surface-400"
            placeholder="A brief summary for the index page..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-surface-900">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all rounded-xl appearance-none"
            >
              <option value="Tech">Tech</option>
              <option value="Personal">Personal</option>
              <option value="DevOps">DevOps</option>
              <option value="Career">Career</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-surface-900">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-surface-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all rounded-xl placeholder:text-surface-400"
              placeholder="e.g. react, nextjs, typescript"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 text-primary-600 bg-white border-surface-300 rounded focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
          />
          <label htmlFor="published" className="text-sm font-semibold cursor-pointer text-surface-900">
            Publish Immediately
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-surface-900">Content Body</label>
          <div className="border border-surface-200 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all rounded-xl overflow-hidden bg-white">
             <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="pt-4">
            <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
            {loading ? "Publishing..." : "Publish Entry"}
            </button>
        </div>
      </form>
    </div>
  );
}