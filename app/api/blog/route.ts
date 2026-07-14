import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  type BlogPostInput,
} from "@/lib/blog";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";

async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
}

export async function GET(request: Request) {
  const session = await requireSession();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const drafts = searchParams.get("drafts") === "1";

  // Public can list published posts; drafts require auth
  if (drafts && !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (slug) {
      const post = await getPostBySlug(slug, {
        includeDrafts: Boolean(session && drafts),
      });
      if (!post) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      // Hide drafts from unauthenticated clients
      if (!post.published && !session) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    const posts = await getAllPosts(Boolean(session && drafts));
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/blog", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as BlogPostInput;
    const post = await createPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      contentFormat: body.contentFormat || "html",
      category: body.category,
      tags: body.tags,
      published: body.published,
      date: body.date,
    });

    revalidateBlogPaths(post.slug);

    return NextResponse.json({ success: true, post, slug: post.slug });
  } catch (error) {
    console.error("POST /api/blog", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create post" },
      { status: 500 }
    );
  }
}
