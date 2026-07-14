import IdentityPanel from "@/components/IdentityPanel";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1080px] lg:grid lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] min-h-screen lg:gap-x-14 xl:gap-x-20">
      <div className="lg:border-r border-line lg:pr-10 xl:pr-12">
        <IdentityPanel />
      </div>

      <div className="py-10 lg:py-14 lg:pl-2">
        <Projects />
        <Experience />
        <TechStack />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
