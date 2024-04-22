import React from "react";
import Headshot from "./Headshot";
import Social from "./Social";
type Props = {};

function Hero({}: Props) {
  return (
    <section className="lg:w-[50%] w-[100%] dark:text-gray-300 lg:relative">
      <div className="flex flex-col">
        <div className="lg:fixed top-auto"><Headshot /></div>
        <div className=" my-6 lg:fixed top-64">
          <h1 className=" lg:text-5xl md:text-5xl sm:text-5xl text-4xl  my-2 ">I am Devyanshu Jadon.</h1>
          <h3 className=" text-xl my-2 ">Software Developer based in India.</h3>
        </div>
        <div className="lg:fixed top-96">
        <Social />
        </div>
      </div>
    </section>
  );
}

export default Hero;
