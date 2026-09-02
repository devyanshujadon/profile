import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  htmlToMarkdown,
  normalizePathname,
  renderDevelopersMarkdown,
  renderHomeMarkdown,
  resolveMarkdownPage,
} from "./markdown-content";

describe("htmlToMarkdown", () => {
  it("converts headings, links, and lists", () => {
    const md = htmlToMarkdown(
      '<h1>Title</h1><p>See <a href="https://devyanshu.com">site</a>.</p><ul><li>One</li></ul>'
    );
    assert.match(md, /^# Title/m);
    assert.match(md, /\[site\]\(https:\/\/devyanshu\.com\)/);
    assert.match(md, /^- One/m);
  });
});

describe("normalizePathname", () => {
  it("treats /index as home and strips trailing slashes", () => {
    assert.equal(normalizePathname("/index"), "/");
    assert.equal(normalizePathname("/developers/"), "/developers");
    assert.equal(normalizePathname(""), "/");
  });
});

describe("static markdown pages", () => {
  it("renders a homepage that names Devyanshu and recovery links", () => {
    const body = renderHomeMarkdown();
    assert.match(body, /^# Devyanshu Jadon/m);
    assert.match(body, /LoomKit/);
    assert.match(body, /\/llms\.txt/);
    assert.match(body, /\/sitemap\.xml/);
    assert.match(body, /Devyanshu developer resources/);
  });

  it("renders developer resources with the product name in the heading", () => {
    const body = renderDevelopersMarkdown();
    assert.match(body, /^# Devyanshu developer resources/m);
    assert.match(body, /LoomKit/);
    assert.match(body, /FeedFr/);
    assert.match(body, /GitHub/);
    assert.match(body, /no public API/i);
  });
});

describe("resolveMarkdownPage", () => {
  it("serves developers as 200 markdown without hitting the CMS", async () => {
    const dev = await resolveMarkdownPage("/developers");
    assert.equal(dev.status, 200);
    assert.match(dev.body, /^# Devyanshu developer resources/m);
  });

  it("returns HTTP 404 markdown with recovery links for unknown paths", async () => {
    const missing = await resolveMarkdownPage(
      "/some-path-that-does-not-exist"
    );
    assert.equal(missing.status, 404);
    assert.match(missing.body, /^# Not found/m);
    assert.match(missing.body, /\/llms\.txt/);
    assert.match(missing.body, /\/sitemap\.xml/);
    assert.match(missing.body, /\/developers/);
  });
});
