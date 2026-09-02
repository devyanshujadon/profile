import type { MetadataRoute } from "next";
import { cmsPageSitemapUrls } from "@/lib/markdown-content";
import { SITE, staticSitemapEntries } from "@/lib/site";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticSitemapEntries(SITE.url);
  let pages: Awaited<ReturnType<typeof cmsPageSitemapUrls>> = [];
  try {
    pages = await cmsPageSitemapUrls(SITE.url);
  } catch {
    pages = [];
  }

  return [
    ...staticEntries,
    ...pages.map((page) => ({
      url: page.url,
      lastModified: page.lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
