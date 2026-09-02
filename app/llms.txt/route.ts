import { appendVaryAccept, markdownContentType } from "@/lib/accept";
import { buildLlmsTxt } from "@/lib/site";

export const revalidate = 3600;

export function GET() {
  const headers = new Headers({
    "Content-Type": markdownContentType(),
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  });
  appendVaryAccept(headers);
  return new Response(buildLlmsTxt(), { headers });
}
