/**
 * Accept parsing and representation selection for text/markdown negotiation.
 * Algorithm follows acceptmarkdown.com (RFC 9110 §12.5.1).
 */

export const PRODUCES = ["text/html", "text/markdown"] as const;
export type ProducedType = (typeof PRODUCES)[number];

type AcceptEntry = { type: string; q: number; specificity: number };

export function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((s) => s.trim());
    const type = (parts[0] || "").toLowerCase();
    let q = 1;
    for (const param of parts.slice(1)) {
      const eq = param.indexOf("=");
      const name = (eq === -1 ? param : param.slice(0, eq)).trim().toLowerCase();
      const value = eq === -1 ? "" : param.slice(eq + 1).trim();
      if (name === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
    return { type, q, specificity };
  });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

/**
 * Pick the representation to serve.
 * - missing/empty Accept → default (HTML)
 * - no acceptable type among PRODUCES → null (caller should 406)
 */
export function preferredType(header: string | null): ProducedType | null {
  if (!header || !header.trim()) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let bestType: ProducedType | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    if (matched.q <= 0) continue;

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

const VARY_TOKENS = ["Accept", "Accept-Encoding"];

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  const tokens = existing
    ? existing.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const lower = new Set(tokens.map((t) => t.toLowerCase()));
  for (const token of VARY_TOKENS) {
    if (!lower.has(token.toLowerCase())) {
      tokens.push(token);
      lower.add(token.toLowerCase());
    }
  }
  headers.set("Vary", tokens.join(", "));
}

export function markdownContentType(): string {
  return "text/markdown; charset=utf-8";
}

export function notAcceptableBody(): string {
  return "Not Acceptable\n\nAvailable: text/html, text/markdown\n";
}

export function agentLinkHeader(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const mdPath =
    path === "/" ? "/index.md" : path.endsWith(".md") ? path : `${path}.md`;
  return `</llms.txt>; rel="describedby", <${mdPath}>; rel="alternate"; type="text/markdown"`;
}

export function shouldSkipNegotiation(pathname: string): boolean {
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/_vercel/")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname.startsWith("/blog/admin")) return true;
  if (
    /\.(?:png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot|xml|txt)$/i.test(pathname)
  ) {
    return true;
  }
  return false;
}
