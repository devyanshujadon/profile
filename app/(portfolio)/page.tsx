import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";
import { SITE, homepageJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Devyanshu Jadon" },
  description: SITE.description,
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  openGraph: {
    title: "Devyanshu Jadon",
    description: SITE.description,
    url: SITE.url,
    type: "profile",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd()),
        }}
      />
      <HomePage />
    </>
  );
}
