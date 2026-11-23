import Link from "next/link";
import { SITE } from "@/lib/site";

export function Missing() {
  return (
    <section className="missing">
      <h1>Not found</h1>
      <p>That path is not on this site.</p>
      <p className="missing-links">
        <Link href="/" className="text-link">
          Home
        </Link>
        <Link href="/developers" className="text-link">
          Developer resources
        </Link>
        <a className="text-link" href={`mailto:${SITE.email}`}>
          Email
        </a>
      </p>
    </section>
  );
}
