import { headers } from "next/headers";

const BLOG_HOSTS = new Set(["blog.devyanshu.com", "blog.localhost:3000"]);

/** Public path prefix. Empty on the journal host, `/journal` on the portfolio host. */
export async function journalPrefix(): Promise<"" | "/journal"> {
  const host = ((await headers()).get("host") || "").toLowerCase();
  return BLOG_HOSTS.has(host) ? "" : "/journal";
}
