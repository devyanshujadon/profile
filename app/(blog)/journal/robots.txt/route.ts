export const revalidate = 86400;

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://blog.devyanshu.com/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
