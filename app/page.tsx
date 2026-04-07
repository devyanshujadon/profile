import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-24 md:gap-32 pb-16">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Contact />
    </div>
  );
}
