import type { Metadata } from "next";
import { BootScreen } from "@/components/site/BootScreen";
import BlogNavbar from "./_components/BlogNavbar";
import BlogFooter from "./_components/BlogFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.devyanshu.com"),
  title: {
    template: "%s · Journal - Devyanshu",
    default: "Journal - Devyanshu Jadon",
  },
  description: "Engineering notes and writing by Devyanshu Jadon.",
  openGraph: {
    siteName: "Journal - Devyanshu",
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
    <div className="atmosphere site-shell">
      <BootScreen />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <BlogNavbar />
      <main id="main" className="journal-main">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
