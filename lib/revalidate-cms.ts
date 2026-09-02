import { revalidatePath } from "next/cache";
import type { CmsEntryType } from "@/lib/cms";
import { revalidateBlogPaths } from "@/lib/revalidate-blog";

/** Bust caches after any CMS mutation. */
export function revalidateCmsPaths(type?: CmsEntryType, slug?: string) {
  // Portfolio shell always reflects projects / notes
  revalidatePath("/");
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  revalidatePath("/developers");

  if (type === "project" || !type) {
    revalidatePath("/");
  }

  if (type === "page" && slug) {
    revalidatePath(`/p/${slug}`);
    revalidatePath("/p", "layout");
  }

  if (type === "note" || !type) {
    revalidatePath("/");
  }

  // Blog paths when posts change
  if (!type) {
    revalidateBlogPaths(slug);
  }
}
