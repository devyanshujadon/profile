import { revalidatePath } from "next/cache";

/** Bust cached portfolio + journal routes after CMS mutations. */
export function revalidateBlogPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/journal");
  revalidatePath("/journal/feed.xml");
  revalidatePath("/journal/sitemap.xml");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/journal/${slug}`);
  }

  // Category pages + dynamic segments
  revalidatePath("/journal/category", "layout");
  revalidatePath("/blog", "layout");
  revalidatePath("/journal", "layout");
}
