"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { BootScreen } from "@/components/site/BootScreen";
import { Nav } from "@/components/site/Nav";

const SOCIAL = [
  { href: SITE.github, label: "GitHub" },
  { href: SITE.linkedin, label: "LinkedIn" },
  { href: SITE.x, label: "X" },
  { href: SITE.blogUrl, label: "Journal" },
] as const;

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="atmosphere">
      <BootScreen />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <div id="main">{children}</div>
      <footer className="site-foot">
        <div className="shell foot-row">
          <p className="foot-name">Devyanshu Jadon</p>
          <p>{SITE.jobTitle} · {SITE.location}</p>
          <p>
            <Link href="/developers" className="text-link">
              Developer resources
            </Link>
          </p>
          <ul className="foot-links">
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a href={item.href} rel="me noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
