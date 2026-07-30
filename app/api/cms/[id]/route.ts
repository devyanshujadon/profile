import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  deleteEntry,
  duplicateEntry,
  getEntryById,
  updateEntry,
  type CmsEntryInput,
} from "@/lib/cms";
import { revalidateCmsPaths } from "@/lib/revalidate-cms";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const entry = await getEntryById(id);
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ entry });
  } catch (error) {
    console.error("GET /api/cms/[id]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch entry",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = (await request.json()) as Partial<CmsEntryInput> & {
      newSlug?: string;
      action?: string;
    };

    if (body.action === "duplicate") {
      const entry = await duplicateEntry(id);
      revalidateCmsPaths(entry.type, entry.slug);
      return NextResponse.json({ success: true, entry });
    }

    const entry = await updateEntry(id, body);
    revalidateCmsPaths(entry.type, entry.slug);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("PUT /api/cms/[id]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update entry",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const existing = await getEntryById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const ok = await deleteEntry(id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidateCmsPaths(existing.type, existing.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/cms/[id]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete entry",
      },
      { status: 500 }
    );
  }
}
