import type { Metadata } from "next";
import IdentityPanel from "@/components/IdentityPanel";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.name },
  description: SITE.shortDescription,
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <IdentityPanel />
      <Projects />
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-ink">
        <Experience />
        <TechStack />
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
