import React from "react";
import localFont from "next/font/local";
const satoshi = localFont({
  src: "../localfonts/Satoshi-Variable.woff2",
  display: "swap",
});
type Props = {};

function ProjectsHeader({}: Props) {
  return (
    <div className="w-full flex items-center z-50 py-8 px-14">
      <div className="w-[100%] flex items-center justify-between">
        <h1 className={`${satoshi.className} text-3xl font-bold text-white uppercase`}>d<span className="text-red-600 text-3xl">⁕</span>live</h1>

        <ul className="flex gap-12 px-6 text-white">
          <li>About Me</li>
          <li>Blog</li>
          <li>Github</li>
        </ul>

        <button className="rounded-full px-6 py-1 font-semibold bg-white ">Hire Me!</button>
      </div>


      {/* <div className="w-[98.5%] h-16 my-3 bg-[#e8eaf188] rounded-lg border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] flex items-center   backdrop-blur-md text-black justify-between">
        <h1 className="text-lg px-6">Devyanshu</h1>
        <ul className="flex gap-4 px-6">
          <li>About Me</li>
          <li>Contact Me</li>
        </ul>
      </div> */}
    </div>
  );
}

export default ProjectsHeader;
