export const SITE = {
  name: "Devyanshu Jadon",
  givenName: "Devyanshu",
  familyName: "Jadon",
  url: "https://devyanshu.com",
  blogUrl: "https://blog.devyanshu.com",
  description:
    "AI and backend engineer. I design systems for production and ship products people use.",
  shortDescription:
    "AI and backend engineer. Building intelligent systems and products.",
  email: "jadon.devyanshu@gmail.com",
  location: "India · Remote",
  jobTitle: "AI & Backend Engineer",
  github: "https://github.com/devyanshujadon",
  githubHandle: "devyanshujadon",
  linkedin: "https://linkedin.com/in/devyanshu-jadon",
  sameAs: [
    "https://github.com/devyanshujadon",
    "https://linkedin.com/in/devyanshu-jadon",
    "https://blog.devyanshu.com",
  ],
} as const;

export const SITE_PATHS = {
  home: "/",
  developers: "/developers",
  llms: "/llms.txt",
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
} as const;

export const EXPERIENCES = [
  {
    role: "AI Engineer",
    company: "Tudip Technologies",
    period: "2025 — Present",
    detail:
      "Intelligent pipelines and LLM integrations for enterprise applications.",
  },
  {
    role: "Z Ambassador",
    company: "IBMz",
    period: "2020 — 2022",
    detail: "Enterprise computing advocacy and technical workshops.",
  },
] as const;

export const TOOLS = [
  ["Languages", "JavaScript, TypeScript, Python, Go"],
  ["AI", "LLMs, LangChain, LangGraph, RAG, TensorFlow, PyTorch"],
  ["Infrastructure", "PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS"],
  ["Frameworks", "FastAPI, Next.js, Node.js, Flask, Pydantic, SQLAlchemy"],
] as const;

export const KNOWS_ABOUT = [
  "Artificial intelligence",
  "Backend engineering",
  "Large language models",
  "RAG",
  "Python",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
];

export type DeveloperResource = {
  name: string;
  url: string;
  description: string;
};

export const DEVELOPER_RESOURCES: DeveloperResource[] = [
  {
    name: "Devyanshu Jadon on GitHub",
    url: SITE.github,
    description:
      "Source for personal projects and public repositories by Devyanshu.",
  },
  {
    name: "LoomKit",
    url: "https://loomkit.vercel.app/",
    description:
      "Tiny, swappable LLM orchestration core — a Protocol, a few dataclasses, one optional provider.",
  },
  {
    name: "FeedFr",
    url: "https://feedfr.com",
    description:
      "User feedback boards, voting, roadmaps, and changelogs. Product by Devyanshu.",
  },
  {
    name: "Devyanshu journal",
    url: SITE.blogUrl,
    description: "Engineering notes and writing by Devyanshu Jadon.",
  },
  {
    name: "Devyanshu on LinkedIn",
    url: SITE.linkedin,
    description: "Professional profile and work history.",
  },
];

export function absoluteUrl(path: string, origin = SITE.url): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${suffix}`;
}

export function personJsonLd(origin = SITE.url) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: SITE.name,
    givenName: SITE.givenName,
    familyName: SITE.familyName,
    url: origin,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    jobTitle: SITE.jobTitle,
    knowsAbout: [...KNOWS_ABOUT],
    sameAs: [...SITE.sameAs],
    worksFor: {
      "@type": "Organization",
      name: "Tudip Technologies",
    },
  };
}

export function websiteJsonLd(origin = SITE.url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: SITE.name,
    url: origin,
    description: SITE.shortDescription,
    author: { "@id": `${origin}/#person` },
    publisher: { "@id": `${origin}/#person` },
  };
}

function withoutContext<T extends { "@context"?: unknown }>(node: T) {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function homepageJsonLd(origin = SITE.url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(personJsonLd(origin)),
      withoutContext(websiteJsonLd(origin)),
      {
        "@type": "ProfilePage",
        "@id": `${origin}/#profile`,
        url: origin,
        name: SITE.name,
        description: SITE.description,
        about: { "@id": `${origin}/#person` },
        mainEntity: { "@id": `${origin}/#person` },
        isPartOf: { "@id": `${origin}/#website` },
      },
    ],
  };
}

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

export function staticSitemapEntries(origin = SITE.url): SitemapEntry[] {
  const now = new Date();
  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${origin}/developers`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

/**
 * llms.txt v2 (llmstxt.org): H1, optional blockquote, info (no headings),
 * then H2 sections whose bodies are markdown link lists.
 */
export function buildLlmsTxt(origin = SITE.url): string {
  return `# ${SITE.name}

> ${SITE.description} Personal site at ${origin}. Open to work. ${SITE.location}.

When to use this site: reach for Devyanshu Jadon when you need an AI or backend engineer, a contact email or hiring pointer, or developer resources published under his name (LoomKit, FeedFr, GitHub, journal). This is a personal portfolio — not a SaaS product. There is no public HTTP API, OpenAPI spec, auth flow, developer portal, or MCP server to call.

How an agent should call this site:
1. Read this file first: ${origin}/llms.txt
2. Prefer \`Accept: text/markdown\` on any page URL (or fetch the \`.md\` sibling, e.g. ${origin}/index.md).
3. Use ${origin}/developers for Devyanshu developer resources by name.
4. Use ${origin}/sitemap.xml to enumerate indexable URLs.
5. Missing paths return HTTP 404 with a short markdown recovery body — do not retry invented API routes.
6. To contact a human, email ${SITE.email}.

## When to use this

- [Contact Devyanshu Jadon](mailto:${SITE.email}): Reach for this site to hire or write an AI and backend engineer
- [Devyanshu developer resources](${origin}/developers): GitHub, LoomKit, FeedFr, journal, and machine-readable files under his name

## Pages

- [Home](${origin}/): Portfolio of Devyanshu Jadon — work, path, tools, contact
- [Devyanshu developer resources](${origin}/developers): GitHub, LoomKit, FeedFr, journal, machine-readable files
- [Sitemap](${origin}/sitemap.xml): XML list of indexable URLs
- [Journal](${SITE.blogUrl}): Engineering notes and writing by Devyanshu Jadon

## Developer resources

- [Devyanshu Jadon on GitHub](${SITE.github}): Public source and repositories
- [LoomKit](https://loomkit.vercel.app/): LLM orchestration core by Devyanshu
- [FeedFr](https://feedfr.com): Feedback boards, roadmaps, and changelogs by Devyanshu
- [Devyanshu on LinkedIn](${SITE.linkedin}): Work history

## Optional

- [Journal RSS](${SITE.blogUrl}/feed.xml): Full-text feed of writing
- [Journal sitemap](${SITE.blogUrl}/sitemap.xml): Index of published entries
`;
}

export function notFoundMarkdown(pathname: string, origin = SITE.url): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `# Not found

The path \`${path}\` does not exist on ${SITE.name}'s site (${origin}).

## Where to look next

- [Home](${origin}/)
- [llms.txt](${origin}/llms.txt): pages, developer resources, and when to use this site
- [Sitemap](${origin}/sitemap.xml): all indexable URLs
- [Devyanshu developer resources](${origin}/developers)
- [Journal](${SITE.blogUrl})
`;
}

export function robotsTxt(origin = SITE.url): string {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
}
