import React from "react";
import Headshot from "./Headshot";
import Social from "./Social";
type Props = {};

function Hero({}: Props) {
  return (
    <section className="lg:w-[50%] w-[100%]">
      <div className="flex flex-col">
        <div><Headshot /></div>
        <div className=" my-6 ">
          <h1 className=" lg:text-5xl md:text-5xl sm:text-5xl text-4xl  my-2 ">I am Devyanshu Jadon.</h1>
          <h3 className=" text-xl my-2 ">Software Developer based in India.</h3>
        </div>
        <Social />
      </div>
    </section>
  );
}

export default Hero;
