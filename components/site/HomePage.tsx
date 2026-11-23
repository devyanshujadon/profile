import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EXPERIENCES, SITE, TOOLS } from "@/lib/site";
import { Lab } from "@/components/site/Lab";
import { NOTES, STUDIES, type Study } from "@/lib/profile";

const IMAGES: Record<string, string> = {
  FeedFr: "/images/feedfr-board.jpg",
  Diligent: "/images/landing-diligent.jpg",
  LoomKit: "/images/landing-loomkit.jpg",
};

const FACTS = [
  ["Now", "AI Engineer · Tudip Technologies"],
  ["Focus", "Agents, automations & SaaS tools"],
  ["Based in", "India"],
  ["Open to", "Products, roles & collaborations"],
] as const;

function WorkMeta({ study, tag }: { study: Study; tag?: string }) {
  return (
    <p className="work-meta">
      {tag && <span className="work-tag">{tag}</span>}
      <span>{study.year}</span>
      <span>{study.tech}</span>
      {study.links.map((l) => (
        <span key={l.href}>
          {l.label} <ArrowUpRight size={13} style={{ display: "inline", verticalAlign: "-2px" }} aria-hidden="true" />
        </span>
      ))}
    </p>
  );
}

export function HomePage() {
  const [featured, ...rest] = STUDIES;
  if (!featured) return null;
  const featuredImage = IMAGES[featured.name];

  return (
    <main>
      {/* Hero */}
      <section className="hero shell" aria-labelledby="home-title">
        <p className="hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          Available for new projects — {SITE.location}
        </p>
        <h1 id="home-title">
          I build AI agents that <em>get work done.</em>
        </h1>
        <p className="lede">
          I&apos;m {SITE.name}, an AI and software developer at Tudip Technologies.
          I build practical agents, automations, and SaaS tools — and ship side
          projects like FeedFr in the open.
        </p>
        <div className="hero-actions">
          <a href={`mailto:${SITE.email}`} className="btn-primary">
            Get in touch <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href="#work" className="btn-ghost">View selected work</a>
        </div>
        <ul className="hero-meta">
          {FACTS.map(([k, v]) => (
            <li key={k}><strong>{v}</strong>{k}</li>
          ))}
        </ul>
      </section>

      {/* Selected work */}
      <section className="section shell" id="work" aria-labelledby="work-title">
        <div className="section-head">
          <div>
            <p className="kicker">Selected work</p>
            <h2 id="work-title">Designed, built, shipped.</h2>
          </div>
          <p>Side projects taken from idea to live product — each one solving a small, real problem well.</p>
        </div>

        <a
          className="work-feature"
          href={featured.links[0]?.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${featured.name} (opens in a new tab)`}
        >
          {featuredImage && (
            <div className="work-feature-media">
              <Image src={featuredImage} alt="" fill sizes="(max-width: 860px) 100vw, 55vw" priority />
            </div>
          )}
          <div>
            <WorkMeta study={featured} tag="Featured" />
            <h3>{featured.name}</h3>
            <p className="work-summary">{featured.summary}</p>
            <p style={{ margin: ".8rem 0 0", color: "var(--ink-2)" }}>{featured.outcome}</p>
          </div>
        </a>

        <ol className="work-list">
          {rest.map((study, i) => (
            <li key={study.name} className="work-row">
              <a
                className="work-row-link"
                href={study.links[0]?.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${study.name} (opens in a new tab)`}
              >
                <span className="work-index" aria-hidden="true">{String(i + 2).padStart(2, "0")}</span>
                <span>
                  <h3>{study.name}</h3>
                  <p>{study.summary}</p>
                </span>
                <WorkMeta study={study} />
              </a>
            </li>
          ))}
        </ol>
      </section>

      <Lab />

      {/* About */}
      <section className="section shell" id="about" aria-labelledby="about-title">
        <div className="section-head">
          <div>
            <p className="kicker">About</p>
            <h2 id="about-title">A practical slice of AI work.</h2>
          </div>
        </div>
        <div className="about-grid">
          <div className="prose-block">
            <p>
              I&apos;m an AI engineer at Tudip Technologies during the day, building
              LLM integrations and retrieval pipelines for enterprise products.
              Nights and weekends go to side projects — FeedFr is the one I keep shipping.
            </p>
            <p>
              I enjoy the practical slice of this work: agents and automations that
              remove a manual step, and interfaces clear enough that someone can use
              them without a walkthrough.
            </p>
            <p>
              I studied computer science at Bansal Institute in Bhopal. From 2020 to
              2022 I was an IBM Z Ambassador, teaching workshops for students who were
              just getting started.
            </p>
            <dl className="about-facts">
              {FACTS.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h3 style={{ margin: "0 0 .5rem", fontSize: "1.4rem" }}>Experience</h3>
            <ul className="exp-list">
              {EXPERIENCES.map((e) => (
                <li key={`${e.role}-${e.company}`}>
                  <span className="exp-role">{e.role} — {e.company}</span>
                  <span className="exp-meta">{e.period}</span>
                  <span className="exp-detail">{e.detail}</span>
                </li>
              ))}
            </ul>
            <h3 style={{ margin: "2rem 0 .8rem", fontSize: "1.4rem" }}>Toolbox</h3>
            <dl className="tools-list">
              {TOOLS.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="section shell" id="notes" aria-labelledby="notes-title">
        <div className="section-head">
          <div>
            <p className="kicker">Writing</p>
            <h2 id="notes-title">Notes from building.</h2>
          </div>
          <p>Engineering logs and field notes on agents, products, and the work around them.</p>
        </div>
        <ol className="note-list">
          {NOTES.map((note) => (
            <li key={note.href}>
              <a href={note.href}>
                <span className="note-title">{note.title}</span>
                <span className="note-date">{note.date}</span>
              </a>
              <p>{note.excerpt}</p>
            </li>
          ))}
        </ol>
        <p className="notes-more">
          <a className="text-link" href={SITE.blogUrl}>Read the journal</a>{" "}
          <span style={{ color: "var(--ink-3)" }}>·</span>{" "}
          <a className="text-link" href="/blog">All writing on this site</a>
        </p>
      </section>

      {/* Contact */}
      <section className="contact shell" id="contact" aria-labelledby="contact-title">
        <p className="kicker">Contact</p>
        <h2 id="contact-title">Have something to build?</h2>
        <p className="lede" style={{ marginTop: "1rem" }}>
          For a product, a role, or a collaboration — email me. I read what comes in.
        </p>
        <a className="contact-mail" href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </section>
    </main>
  );
}
