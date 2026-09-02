import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  agentLinkHeader,
  appendVaryAccept,
  preferredType,
  shouldSkipNegotiation,
} from "./accept";

describe("preferredType (acceptmarkdown.com vectors)", () => {
  it("serves markdown for Accept: text/markdown", () => {
    assert.equal(preferredType("text/markdown"), "text/markdown");
  });

  it("serves markdown when markdown is listed before lower-q html", () => {
    assert.equal(
      preferredType("text/markdown, text/html;q=0.8"),
      "text/markdown"
    );
  });

  it("serves html for Accept: text/html", () => {
    assert.equal(preferredType("text/html"), "text/html");
  });

  it("respects q=0 rejection of markdown", () => {
    assert.equal(preferredType("text/markdown;q=0, text/html"), "text/html");
  });

  it("returns null (406) when the only produced type is rejected", () => {
    assert.equal(preferredType("text/markdown;q=0"), null);
  });

  it("defaults to html when Accept is missing", () => {
    assert.equal(preferredType(null), "text/html");
  });

  it("defaults to html for */*", () => {
    assert.equal(preferredType("*/*"), "text/html");
  });

  it("does not substring-match Chrome-style html Accept as markdown", () => {
    const chrome =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
    assert.equal(preferredType(chrome), "text/html");
  });

  it("returns 406 for application/pdf only", () => {
    assert.equal(preferredType("application/pdf"), null);
  });

  it("picks markdown from agent-style ranked Accept", () => {
    assert.equal(
      preferredType("text/markdown, text/plain;q=0.5, */*;q=0.1"),
      "text/markdown"
    );
  });

  it("lets a more specific range override a wildcard regardless of q", () => {
    assert.equal(preferredType("text/html;q=0, */*;q=1"), "text/markdown");
  });
});

describe("appendVaryAccept", () => {
  it("sets Vary: Accept, Accept-Encoding on an empty header", () => {
    const headers = new Headers();
    appendVaryAccept(headers);
    assert.equal(headers.get("Vary"), "Accept, Accept-Encoding");
  });

  it("appends Accept to an existing Next.js Vary list", () => {
    const headers = new Headers({
      Vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
    });
    appendVaryAccept(headers);
    const vary = headers.get("Vary") || "";
    assert.match(vary, /Accept/i);
    assert.match(vary, /Accept-Encoding/i);
    assert.match(vary, /rsc/i);
  });

  it("does not duplicate Accept", () => {
    const headers = new Headers({ Vary: "Accept, Accept-Encoding" });
    appendVaryAccept(headers);
    assert.equal(headers.get("Vary"), "Accept, Accept-Encoding");
  });
});

describe("agentLinkHeader", () => {
  it("points at llms.txt and a .md sibling", () => {
    const home = agentLinkHeader("/");
    assert.match(home, /<\/llms\.txt>; rel="describedby"/);
    assert.match(
      home,
      /<\/index\.md>; rel="alternate"; type="text\/markdown"/
    );

    const inner = agentLinkHeader("/developers");
    assert.match(inner, /<\/developers\.md>/);
  });
});

describe("shouldSkipNegotiation", () => {
  it("skips APIs, internals, and already-machine files", () => {
    assert.equal(shouldSkipNegotiation("/api/blog"), true);
    assert.equal(shouldSkipNegotiation("/llms.txt"), true);
    assert.equal(shouldSkipNegotiation("/sitemap.xml"), true);
    assert.equal(shouldSkipNegotiation("/robots.txt"), true);
    assert.equal(shouldSkipNegotiation("/blog/admin"), true);
  });

  it("negotiates HTML pages and .md siblings", () => {
    assert.equal(shouldSkipNegotiation("/"), false);
    assert.equal(shouldSkipNegotiation("/developers"), false);
    assert.equal(shouldSkipNegotiation("/index.md"), false);
    assert.equal(shouldSkipNegotiation("/developers.md"), false);
  });
});
