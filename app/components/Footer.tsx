import React from "react";
import FooterImage from "./FooterImage";
import Social from "./Social";
import Link from "next/link";

type Props = {};

function Footer({}: Props) {
  return (
    <footer  className=" h-full w-[auto] lg:p-8">
      <div className="flex flex-col lg:flex-row items-center lg:h-52   bg-black w-[auto] dark:text-white text-white lg:container  lg:rounded-full  px-16 py-8 justify-between ">
      <div className="hidden lg:flex items-center gap-8 lg:p-4">
        <FooterImage />
        <div className=" lg:my-6 ">
          <h1 className=" text-sm  my-2 ">I am Devyanshu Jadon.</h1>
          <h3 className=" text-sm my-2 ">Software Developer based in India.</h3>
        </div>
        
      </div>

      <div className="lg:hidden my-4"><h6>© 2024 | Devyanshu Jadon </h6></div>
      
      <div className="flex items-center gap-4 my-4">
          <ul className=" flex gap-8">
               <Link href={"/"}><li>Home</li></Link>
               <Link href={"/about"}><li>About Me</li></Link>
               <Link href={"/"}><li>Blog</li></Link>
               
          </ul>
        </div>
      <div className="flex items-center gap-8 my-4 lg:p-4"> 
        <div className="text-black dark:text-white"><Social /></div>
        <button className='bg-[#fff] text-[#000] border px-6 py-2 gap-12 rounded-3xl lg:flex md:flex sm:flex hidden '>Let's Talk</button>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
