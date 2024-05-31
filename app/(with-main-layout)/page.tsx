import Education from "../components/Education";
import Events from "../components/Events";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import TaglineSection from "../components/TaglineSection";

export default function Home() {
  return (
    <section className=' w-[100%] py-20 container lg:px-48 h-[100%]'>
      <div className="lg:flex justify-center">
      <Hero />
      <div className="flex flex-col lg:w-[50%]" >
        <TaglineSection />
        <Experience />
        <Education />
        <Events />
      </div>
      </div>
    </section>
  )
}