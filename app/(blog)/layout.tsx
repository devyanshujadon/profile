import type { Metadata } from "next";
import BlogNavbar from "./_components/BlogNavbar";
import BlogFooter from "./_components/BlogFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.devyanshu.com"),
  title: {
    template: "%s · Journal — Devyanshu",
    default: "Journal — Devyanshu Jadon",
  },
  description:
    "Engineering notes and writing by Devyanshu Jadon.",
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
    <div className="site-shell min-h-screen">
      <BlogNavbar />
      <main className="relative min-h-screen pt-28 pb-12 px-6 sm:px-10">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
