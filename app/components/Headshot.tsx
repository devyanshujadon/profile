import React from "react";
import Image from "next/image";
type Props = {};

function Headshot({}: Props) {
  return (
    <Image
      src="/linkedin-dp.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
      className="rounded-2xl  h-64 sm:h-48 md:h-48 lg:h-48 w-full sm:w-48 md:w-48 lg:w-48 object-cover object-bottom sm:object-center md:object-center lg:object-center"
    ></Image>
  );
}

export default Headshot;
