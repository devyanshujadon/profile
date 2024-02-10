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
      className="rounded-2xl  h-48 w-48 object-cover"
    ></Image>
  );
}

export default Headshot;
