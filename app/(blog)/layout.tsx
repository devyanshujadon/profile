import type { Metadata } from "next";
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
    <div className="site-shell min-h-[100dvh]">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <BlogNavbar />
      <main id="main" className="relative min-h-[100dvh] pt-10 pb-12 px-5 sm:px-7 lg:px-9">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
