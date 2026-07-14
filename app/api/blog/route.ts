import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  createPost,
  getAllPosts,
  getPostBySlug,
  type BlogPostInput,
} from "@/lib/blog";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";

export async function GET(request: Request) {
  const admin = await requireAdmin();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const drafts = searchParams.get("drafts") === "1";

  // Drafts only for admins
  if (drafts && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (slug) {
      const post = await getPostBySlug(slug, {
        includeDrafts: Boolean(admin && drafts),
      });
      if (!post) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      if (!post.published && !admin) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    const posts = await getAllPosts(Boolean(admin && drafts));
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET /api/blog", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch posts",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
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
      {
        error:
          error instanceof Error ? error.message : "Failed to create post",
      },
      { status: 500 }
    );
  }
}
