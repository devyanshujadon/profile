import {
  agentLinkHeader,
  appendVaryAccept,
  markdownContentType,
} from "@/lib/accept";
import { resolveMarkdownPage } from "@/lib/markdown-content";

export const runtime = "nodejs";
export const revalidate = 60;

function markdownResponse(body: string, status: number, pathname: string) {
  const headers = new Headers({
    "Content-Type": markdownContentType(),
    "Cache-Control":
      status === 404
        ? "public, max-age=0, must-revalidate"
        : "public, s-maxage=60, stale-while-revalidate=86400",
    Link: agentLinkHeader(pathname),
  });
  appendVaryAccept(headers);
  return new Response(body, { status, headers });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug = [] } = await params;
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const result = await resolveMarkdownPage(pathname);
  return markdownResponse(result.body, result.status, pathname);
}
