import {
  DEVELOPER_RESOURCES,
  EXPERIENCES,
  SITE,
  TOOLS,
  notFoundMarkdown,
} from "@/lib/site";
import {
  FALLBACK_PROJECTS,
  loadProjects,
  type ProjectView,
} from "@/lib/projects";
import { getAllCategories, getAllPosts, getPostBySlug } from "@/lib/blog";
import { getEntryBySlug, getPublishedPages } from "@/lib/cms";

export type MarkdownResult = {
  status: 200 | 404;
  body: string;
};

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).trim();
}

/** Lossy HTML → Markdown for posts stored as HTML. */
export function htmlToMarkdown(html: string): string {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `# ${stripTags(t)}\n\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `## ${stripTags(t)}\n\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `### ${stripTags(t)}\n\n`);
  s = s.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, t) => `[${stripTags(t) || href}](${href})`
  );
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) => `**${stripTags(t)}**`);
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => `**${stripTags(t)}**`);
  s = s.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => `*${stripTags(t)}*`);
  s = s.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, t) => `*${stripTags(t)}*`);
  s = s.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, t) => `\`${stripTags(t)}\``);
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${stripTags(t)}\n`);
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/p>/gi, "\n\n");
  s = s.replace(/<\/h[1-6]>/gi, "\n\n");
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  let path = pathname.split("?")[0].split("#")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path === "/index") return "/";
  return path;
}

function renderProject(project: ProjectView): string {
  const points = project.points.map((p) => `- ${p}`).join("\n");
  const link =
    project.href && project.href !== "#"
      ? `[${project.linkLabel || project.href}](${project.href})`
      : "";
  return `### ${project.title}

${project.tag} · ${project.year}${project.stack ? ` · ${project.stack}` : ""}

${project.blurb}
${points ? `\n${points}\n` : ""}${link ? `\n${link}\n` : ""}`;
}

export function renderHomeMarkdown(
  projects: ProjectView[] = FALLBACK_PROJECTS,
  origin = SITE.url
): string {
  const work = projects.map(renderProject).join("\n");
  const path = EXPERIENCES.map(
    (exp) =>
      `- **${exp.period}** — ${exp.company} · ${exp.role}: ${exp.detail}`
  ).join("\n");
  const tools = TOOLS.map(([title, items]) => `- **${title}:** ${items}`).join(
    "\n"
  );

  return `# ${SITE.name}

${SITE.description}

${SITE.location} · Open to work

- Email: [${SITE.email}](mailto:${SITE.email})
- GitHub: [${SITE.githubHandle}](${SITE.github})
- LinkedIn: [devyanshu-jadon](${SITE.linkedin})
- Writing: [journal](${SITE.blogUrl})
- Developer resources: [Devyanshu developer resources](${origin}/developers)

## Work

${work}

## Path

${path}

## Tools

${tools}

## Contact

Open to thoughtful collaborations and interesting problems.

If you're building something that needs AI depth, backend architecture, or a product-minded engineer — write ${SITE.email}.

## For agents

- [llms.txt](${origin}/llms.txt)
- [sitemap.xml](${origin}/sitemap.xml)
- [Devyanshu developer resources](${origin}/developers)
`;
}

export function renderDevelopersMarkdown(origin = SITE.url): string {
  const resources = DEVELOPER_RESOURCES.map(
    (r) => `- [${r.name}](${r.url}): ${r.description}`
  ).join("\n");

  return `# Devyanshu developer resources

Developer resources for **Devyanshu Jadon** (${origin}): public work, source, writing, and machine-readable files. Search for “Devyanshu developer resources” lands here.

This is a personal site. There is **no public API**, OpenAPI spec, auth documentation, developer portal, or MCP server. Do not invent REST paths under ${origin}/api — those routes are private.

## When to use these resources

- Look up Devyanshu’s GitHub, products (LoomKit, FeedFr), or journal
- Contact or hire Devyanshu for AI / backend engineering
- Discover machine-readable copies of this site (llms.txt, sitemap, markdown)

## Public work and source

${resources}

## Machine-readable

- [llms.txt](${origin}/llms.txt): index plus when-to-use guidance
- [sitemap.xml](${origin}/sitemap.xml): indexable URLs
- Pages also serve \`text/markdown\` when requested with \`Accept: text/markdown\`, and as \`.md\` siblings (e.g. ${origin}/index.md)

## Contact

[${SITE.email}](mailto:${SITE.email})
`;
}

function postToMarkdown(
  post: {
    title: string;
    date: string;
    excerpt: string;
    category: string;
    tags: string[];
    contentHtml?: string;
    contentFormat?: string;
    slug: string;
  },
  canonical: string
): string {
  const raw = post.contentHtml || "";
  const body =
    post.contentFormat === "markdown" ||
    (!/<[a-z][\s\S]*>/i.test(raw) &&
      /(?:^|\n)\s*#{1,6}\s|^\s*[-*+]\s/m.test(raw))
      ? raw.trim()
      : htmlToMarkdown(raw);

  const tags = post.tags.length ? post.tags.join(", ") : "";
  return `# ${post.title}

- Date: ${post.date}
- Category: ${post.category}${tags ? `\n- Tags: ${tags}` : ""}
- Canonical: ${canonical}

${post.excerpt}

${body}
`;
}

async function journalIndexMarkdown(): Promise<string> {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch {
    posts = [];
  }

  const items =
    posts.length === 0
      ? "- No published entries yet."
      : posts
          .map(
            (p) =>
              `- [${p.title}](${SITE.blogUrl}/${p.slug}): ${p.excerpt || p.date}`
          )
          .join("\n");

  return `# Journal — ${SITE.name}

Engineering notes and writing by ${SITE.name}.

${items}

- [RSS](${SITE.blogUrl}/feed.xml)
- [Sitemap](${SITE.blogUrl}/sitemap.xml)
- [Portfolio](${SITE.url}/)
`;
}

async function resolveJournalPost(slug: string): Promise<MarkdownResult | null> {
  try {
    const post = await getPostBySlug(slug);
    if (!post || !post.published) return null;
    return {
      status: 200,
      body: postToMarkdown(post, `${SITE.blogUrl}/${post.slug}`),
    };
  } catch {
    return null;
  }
}

async function resolveCmsPage(slug: string): Promise<MarkdownResult | null> {
  try {
    const page = await getEntryBySlug("page", slug);
    if (!page || !page.published) return null;
    const body =
      page.contentFormat === "markdown"
        ? page.content.trim()
        : page.contentFormat === "plain"
          ? page.content.trim()
          : htmlToMarkdown(page.content);
    return {
      status: 200,
      body: `# ${page.title}

${page.excerpt ? `${page.excerpt}\n\n` : ""}${body}
`,
    };
  } catch {
    return null;
  }
}

export async function resolveMarkdownPage(
  pathname: string
): Promise<MarkdownResult> {
  const path = normalizePathname(pathname);
  const notFound = (): MarkdownResult => ({
    status: 404,
    body: notFoundMarkdown(path),
  });

  if (path === "/" || path === "/index") {
    const projects = await loadProjects();
    return { status: 200, body: renderHomeMarkdown(projects) };
  }

  if (path === "/developers") {
    return { status: 200, body: renderDevelopersMarkdown() };
  }

  if (path === "/journal" || path === "/blog" || path === "/journal/index") {
    return { status: 200, body: await journalIndexMarkdown() };
  }

  const journalCategory = path.match(/^\/journal\/category\/([^/]+)$/);
  if (journalCategory) {
    const category = decodeURIComponent(journalCategory[1]);
    try {
      const [posts, categories] = await Promise.all([
        getAllPosts(),
        getAllCategories(),
      ]);
      const known = categories.some(
        (c) => c.toLowerCase() === category.toLowerCase()
      );
      if (!known) return notFound();
      const filtered = posts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      const items = filtered
        .map((p) => `- [${p.title}](${SITE.blogUrl}/${p.slug})`)
        .join("\n");
      return {
        status: 200,
        body: `# ${category}

Writing in this category by ${SITE.name}.

${items || "- No entries."}
`,
      };
    } catch {
      return notFound();
    }
  }

  const journalPost = path.match(/^\/journal\/([^/]+)$/);
  if (journalPost) {
    const found = await resolveJournalPost(journalPost[1]);
    return found ?? notFound();
  }

  const blogPost = path.match(/^\/blog\/([^/]+)$/);
  if (blogPost && blogPost[1] !== "admin") {
    const found = await resolveJournalPost(blogPost[1]);
    return found ?? notFound();
  }

  const cmsPage = path.match(/^\/p\/([^/]+)$/);
  if (cmsPage) {
    const found = await resolveCmsPage(cmsPage[1]);
    return found ?? notFound();
  }

  return notFound();
}

export async function cmsPageSitemapUrls(
  origin = SITE.url
): Promise<{ url: string; lastModified: Date }[]> {
  try {
    const pages = await getPublishedPages();
    return pages.map((page) => ({
      url: `${origin}/p/${page.slug}`,
      lastModified: new Date(page.updatedAt || page.date),
    }));
  } catch {
    return [];
  }
}
