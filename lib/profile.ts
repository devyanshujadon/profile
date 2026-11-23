import { SITE } from "@/lib/site";

export type StudyLink = {
  label: string;
  href: string;
};

export type Study = {
  name: string;
  year: string;
  summary: string;
  problem: string;
  built: string;
  decision: string;
  outcome: string;
  tech: string;
  links: StudyLink[];
  aside?: string;
  quote?: string;
  snippet?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const STUDIES: Study[] = [
  {
    name: "FeedFr",
    year: "2026",
    summary:
      "A feedback product for teams who are done collecting requests in a spreadsheet.",
    problem:
      "Feedback lands in Slack, inboxes, and sheets. The person who asked rarely sees what shipped.",
    built:
      "Public boards, voting, a roadmap, a changelog, and a widget you can embed in the product.",
    decision:
      "Keep the loop short. One board, public votes, and a status the requester can actually check.",
    outcome:
      "Live at feedfr.com. One board is free. Paid plans start at $12 a month.",
    tech: "Next.js, TypeScript, PostgreSQL",
    links: [{ label: "Live", href: "https://feedfr.com" }],
    aside: "Code is private for now.",
  },
  {
    name: "Diligent",
    year: "2026",
    summary:
      "A startup name or URL becomes a one-page investment memo. Every sentence cites a finding.",
    problem:
      "A memo is easy to write and hard to trust when the claims float free of sources.",
    built:
      "Research lanes that collect findings, then a writer that can only use what those lanes returned.",
    decision:
      "A critic drops any finding with no real URL, no quote, or a quote that does not support the claim.",
    outcome:
      "A seeded Resend walkthrough shows the lanes, a rejected market-share claim, and the finished memo. Live runs take the same path.",
    tech: "TypeScript, OpenAI, Supabase",
    links: [
      { label: "Code", href: "https://github.com/devyanshujadon/diligent" },
    ],
    quote: "Every sentence in the memo cites a finding.",
  },
  {
    name: "LoomKit",
    year: "2026",
    summary:
      "A tiny LLM orchestration core. The seam under an agent, without a framework you do not need yet.",
    problem:
      "Wiring a model into a project usually means adopting an orchestrator before the loop is even clear.",
    built:
      "A Provider protocol, plus Message, Response, and Usage. Gemini ships as an optional extra.",
    decision:
      "A protocol, not a base class. Streaming, tools, and agents can land later without breaking call sites. The core has zero dependencies.",
    outcome: "On PyPI as loomkit. The core install adds no packages.",
    tech: "Python",
    links: [
      { label: "Live", href: "https://loomkit.vercel.app/" },
      { label: "PyPI", href: "https://pypi.org/project/loomkit/" },
    ],
    snippet: `from loomkit import Message
from loomkit.providers.gemini import GeminiProvider

provider = GeminiProvider()
provider.generate(
    [Message(role="user", content="Hello")],
    model="gemini-2.5-flash",
)`,
  },
  {
    name: "OpenHarness",
    year: "2026",
    summary:
      "A small Python harness for long-running agent tasks, with the control loop in the open.",
    problem:
      "Trying an agent loop should not start with a heavy orchestrator.",
    built:
      "A run loop, context summaries so the transcript does not grow without limit, todos, a sandboxed filesystem, and sub-agents.",
    decision:
      "The orchestrator is a run_step() loop. Tools run, then control returns to the prompt. No graph library in the middle.",
    outcome:
      "MIT licensed on GitHub, with a research-agent example you can run locally.",
    tech: "Python",
    links: [
      {
        label: "Code",
        href: "https://github.com/devyanshujadon/OpenHarness",
      },
    ],
  },
];

export const NOTES = [
  {
    title: "The Cornershop Algorithm",
    date: "7 September 2026",
    href: `${SITE.blogUrl}/the-cornershop-algorithm`,
    excerpt:
      "A song I chose, played back as the same fragment until I stopped wanting to put it on.",
  },
  {
    title: "Your software development job is safe, dude.",
    date: "3 September 2026",
    href: `${SITE.blogUrl}/your-software-development-job-is-safe-dude`,
    excerpt:
      "The middle of the job got cheaper. Deciding what to build, and owning it when it breaks, did not.",
  },
] as const;
