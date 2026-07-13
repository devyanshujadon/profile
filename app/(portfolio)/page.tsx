import IdentityPanel from "@/components/IdentityPanel";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1140px] lg:grid lg:grid-cols-[minmax(270px,310px)_minmax(0,1fr)] min-h-screen">
      {/* Identity column — soft panel on desktop */}
      <div className="lg:border-r border-line lg:bg-panel/40 lg:px-6 xl:px-8">
        <IdentityPanel />
      </div>

      {/* Stream */}
      <div className="lg:pl-12 xl:pl-14 py-10 lg:py-14 lg:pr-2">
        <Projects />
        <Experience />
        <TechStack />

        <footer className="pt-10 pb-2 border-t border-line mt-6 lg:hidden">
          <p className="text-sm text-ink-3">
            © {new Date().getFullYear()} Devyanshu Jadon
          </p>
        </footer>
      </div>
    </div>
  );
}
