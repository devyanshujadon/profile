import Hero from "@/components/Hero";
import Status from "@/components/Status";
import Contact from "@/components/Contact";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-auto md:auto-rows-[180px] gap-4">
        <Hero />
        <Status />
        <Contact />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TechStack />
      </div>
    </div>
  );
}
