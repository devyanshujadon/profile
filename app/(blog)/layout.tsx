import type { Metadata } from "next";
import BlogNavbar from "./_components/BlogNavbar";
import BlogFooter from "./_components/BlogFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.devyanshu.com"),
  title: {
    template: "%s • Journal — Devyanshu",
    default: "Journal — Devyanshu Jadon",
  },
  description:
    "Engineering logs, ideas, and field notes from building software by Devyanshu Jadon.",
  openGraph: {
    siteName: "Journal — Devyanshu",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />
      <main className="min-h-screen pt-20 pb-12 px-4 md:px-8">{children}</main>
      <BlogFooter />
    </>
  );
}
