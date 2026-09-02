import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  SITE,
  buildLlmsTxt,
  homepageJsonLd,
  notFoundMarkdown,
  personJsonLd,
  robotsTxt,
  staticSitemapEntries,
} from "./site";

describe("homepage JSON-LD", () => {
  it("uses Person identity with name, description, url, and sameAs", () => {
    const person = personJsonLd();
    assert.equal(person["@context"], "https://schema.org");
    assert.equal(person["@type"], "Person");
    assert.equal(person.name, "Devyanshu Jadon");
    assert.ok(person.description.length > 0);
    assert.equal(person.url, SITE.url);
    assert.ok(Array.isArray(person.sameAs) && person.sameAs.length >= 2);
    assert.ok(person.sameAs.includes(SITE.github));
  });

  it("embeds Person on the homepage graph", () => {
    const graph = homepageJsonLd();
    assert.equal(graph["@context"], "https://schema.org");
    const types = graph["@graph"].map((node: { "@type": string }) => node["@type"]);
    assert.ok(types.includes("Person"));
    assert.ok(types.includes("WebSite"));
    for (const node of graph["@graph"]) {
      assert.equal(
        Object.prototype.hasOwnProperty.call(node, "@context"),
        false
      );
    }
  });
});

describe("llms.txt", () => {
  const body = buildLlmsTxt();

  it("follows llmstxt.org: H1, blockquote, then H2 file lists", () => {
    const lines = body.split("\n");
    assert.match(lines[0], /^# Devyanshu Jadon$/);
    const quote = lines.find((l) => l.startsWith("> "));
    assert.ok(quote, "missing blockquote summary");
    assert.match(body, /^## Pages$/m);
    assert.match(
      body,
      /^- \[Devyanshu developer resources\]\(https:\/\/devyanshu\.com\/developers\)/m
    );
  });

  it("includes when-to-use guidance and how to call the site", () => {
    assert.match(body, /When to use this site:/);
    assert.match(body, /^## When to use this$/m);
    assert.match(body, /How an agent should call this site:/);
    assert.match(body, /Accept: text\/markdown/);
    assert.match(body, /no public HTTP API/i);
    assert.match(body, /jadon\.devyanshu@gmail\.com/);
  });

  it("names Devyanshu developer resources for name-based discovery", () => {
    assert.match(body, /Devyanshu developer resources/);
    assert.match(body, /LoomKit/);
    assert.match(body, /FeedFr/);
    assert.match(body, /GitHub/);
  });
});

describe("agent-friendly 404 markdown", () => {
  it("points at sitemap, llms.txt, and the developers index", () => {
    const body = notFoundMarkdown("/missing-path");
    assert.match(body, /^# Not found/m);
    assert.match(body, /\/missing-path/);
    assert.match(body, /https:\/\/devyanshu\.com\/llms\.txt/);
    assert.match(body, /https:\/\/devyanshu\.com\/sitemap\.xml/);
    assert.match(body, /https:\/\/devyanshu\.com\/developers/);
  });
});

describe("sitemap and robots", () => {
  it("lists homepage and developers with lastmod", () => {
    const entries = staticSitemapEntries();
    const urls = entries.map((e) => e.url);
    assert.ok(urls.includes("https://devyanshu.com"));
    assert.ok(urls.includes("https://devyanshu.com/developers"));
    for (const entry of entries) {
      assert.ok(entry.lastModified instanceof Date);
      assert.ok(!Number.isNaN(entry.lastModified.getTime()));
    }
  });

  it("points robots.txt at the XML sitemap", () => {
    const body = robotsTxt();
    assert.match(body, /User-agent: \*/);
    assert.match(body, /Sitemap: https:\/\/devyanshu\.com\/sitemap\.xml/);
  });
});
