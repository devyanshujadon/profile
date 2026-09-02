import { NextRequest, NextResponse } from "next/server";
import {
  agentLinkHeader,
  appendVaryAccept,
  notAcceptableBody,
  preferredType,
  shouldSkipNegotiation,
} from "@/lib/accept";

const BLOG_HOSTS = new Set(["blog.devyanshu.com", "blog.localhost:3000"]);

function blogPath(pathname: string): string {
  return pathname === "/" ? "/journal" : `/journal${pathname}`;
}

function withAgentHeaders(response: NextResponse, pathname: string): NextResponse {
  appendVaryAccept(response.headers);
  const existing = response.headers.get("Link");
  const link = agentLinkHeader(pathname);
  if (!existing) {
    response.headers.set("Link", link);
  } else if (!existing.includes('rel="describedby"')) {
    response.headers.set("Link", `${existing}, ${link}`);
  }
  return response;
}

function rewriteMarkdown(request: NextRequest, logicalPath: string): NextResponse {
  const url = request.nextUrl.clone();
  const destPath =
    logicalPath === "/" ? "/api/markdown" : `/api/markdown${logicalPath}`;
  url.pathname = destPath;
  return withAgentHeaders(NextResponse.rewrite(url), logicalPath);
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const isBlogHost = BLOG_HOSTS.has(host);
  const incomingPath = request.nextUrl.pathname;

  if (shouldSkipNegotiation(incomingPath)) {
    // Keep /llms.txt on the canonical app route for both hosts.
    if (isBlogHost && incomingPath !== "/llms.txt") {
      const url = request.nextUrl.clone();
      url.pathname = blogPath(incomingPath);
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const logicalPath = isBlogHost ? blogPath(incomingPath) : incomingPath;

  if (logicalPath.endsWith(".md")) {
    const stripped = logicalPath.slice(0, -3) || "/";
    return rewriteMarkdown(request, stripped === "" ? "/" : stripped);
  }

  const acceptHeader = request.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    return rewriteMarkdown(request, logicalPath);
  }

  if (chosen === null && acceptHeader) {
    return new NextResponse(notAcceptableBody(), {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    });
  }

  if (isBlogHost) {
    const url = request.nextUrl.clone();
    url.pathname = logicalPath;
    return withAgentHeaders(NextResponse.rewrite(url), incomingPath);
  }

  return withAgentHeaders(NextResponse.next(), incomingPath);
}

export const config = {
  matcher: [
    "/((?!_next/|_vercel/|api/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$).*)",
  ],
};
