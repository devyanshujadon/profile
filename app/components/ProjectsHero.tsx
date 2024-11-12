'use client'
import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
const satoshi = localFont({
  src: "../localfonts/Satoshi-Variable.woff2",
  display: "swap",
});
type Props = {};

function ProjectsHero({}: Props) {

  return (
  
      <div className="relative bg-[#93d6e2] mx-12 rounded-3xl py-16 flex overflow-hidden h-[70vh] w-[70%]">

<div className="absolute bottom-0 -left-8 scale-110">
  <Image
    src="/headshot-removebg.png"
    alt="Hero Image"
    width={400}
    height={400}
  />
</div>
<div  className="px-24 absolute right-0">
  <h1 className={`${satoshi.className} text-7xl font-[500] text-[#112969] title-heading`}>
    Hi<span className="text-red-600">,</span> There! 
  </h1>
  <h1 className={`${satoshi.className} text-7xl font-[500] text-[#112969] title-heading`} >
    Welcome to Projects 
  </h1>
  <h1 className={`${satoshi.className} text-7xl font-[500] text-[#112969] title-heading`}>
    By Devyanshu<span className="text-red-600">.</span>
  </h1>
</div>

</div>
    
  );
}

export default ProjectsHero;
