import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  countEntriesByType,
  createEntry,
  listEntries,
  type CmsEntryInput,
  type CmsEntryType,
} from "@/lib/cms";
import { countPosts, getAllPosts } from "@/lib/blog";
import { revalidateCmsPaths } from "@/lib/revalidate-cms";

const VALID_TYPES = new Set<CmsEntryType>([
  "project",
  "page",
  "note",
  "media",
]);

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type");
  const search = searchParams.get("q") || undefined;
  const stats = searchParams.get("stats") === "1";

  try {
    if (stats) {
      const [entryCounts, postCount, posts] = await Promise.all([
        countEntriesByType(true),
        countPosts(true),
        getAllPosts(true),
      ]);
      const publishedPosts = posts.filter((p) => p.published).length;
      return NextResponse.json({
        stats: {
          posts: postCount,
          publishedPosts,
          drafts: postCount - publishedPosts,
          ...entryCounts,
        },
      });
    }

    if (typeParam && !VALID_TYPES.has(typeParam as CmsEntryType)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const type = typeParam as CmsEntryType | undefined;
    const entries = await listEntries(type, {
      includeDrafts: true,
      search,
    });
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("GET /api/cms", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch entries",
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
    const body = (await request.json()) as CmsEntryInput;
    if (!body.type || !VALID_TYPES.has(body.type)) {
      return NextResponse.json(
        { error: "Valid type is required (project, page, note, media)" },
        { status: 400 }
      );
    }

    const entry = await createEntry({
      type: body.type,
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      contentFormat: body.contentFormat || "html",
      status: body.status,
      published: body.published,
      coverImage: body.coverImage,
      featured: body.featured,
      tags: body.tags,
      sortOrder: body.sortOrder,
      meta: body.meta,
      date: body.date,
    });

    revalidateCmsPaths(entry.type, entry.slug);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("POST /api/cms", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create entry",
      },
      { status: 500 }
    );
  }
}
