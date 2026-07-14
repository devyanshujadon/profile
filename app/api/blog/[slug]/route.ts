import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  deletePost,
  getPostBySlug,
  updatePost,
  type BlogPostInput,
} from "@/lib/blog";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  try {
    const post = await getPostBySlug(slug, { includeDrafts: Boolean(session) });
    if (!post || (!post.published && !session)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error("GET /api/blog/[slug]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = (await request.json()) as Partial<BlogPostInput> & {
      newSlug?: string;
    };
    const post = await updatePost(slug, body);
    revalidateBlogPaths(slug);
    if (post.slug !== slug) {
      revalidateBlogPaths(post.slug);
    }
    return NextResponse.json({ success: true, post, slug: post.slug });
  } catch (error) {
    console.error("PUT /api/blog/[slug]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const ok = await deletePost(slug);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidateBlogPaths(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/blog/[slug]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete post" },
      { status: 500 }
    );
  }
}
