import Link from "next/link";
import React from "react";
import { FiSun } from "react-icons/fi";
type Props = {};

function Experience({}: Props) {
  const experience = {
    position: ["Cloud Lead, GDSC", "Chief Chair, ACM Student Chapter", "IBM Z Ambassador"],
    place: ["BIST, Bhopal", "BIST, Bhopal", "IBM Z, India"],
    year: ["May 2023 - Present", "Oct 2022 - Dec 2023", "Oct 2020 - Dec 2022"],
    redirect: ["https://gdsc.community.dev/bansal-institute-of-science-and-technology-bhopal/", "https://www.acm.org/chapters/chapter-newsletters/2022/12", "https://www.credly.com/badges/c286e7d6-e48d-468e-80e3-5b65377a79bf/public_url"]
  };
  return (
    <div>
      <h1 className=" lg:text-5xl md:text-5xl sm:text-5xl text-4xl">Experiences</h1>
      <div className="my-8">
        {experience.position.map((position, index) => (
          <Link href={experience.redirect[index]}>
            <div
            key={index}
            className="flex justify-between  my-4 w-full lg:w-[75%] md:w-[75%] sm:w-[75%] rounded-full items-center gap-2 dark:bg-gray-500 bg-white px-4 py-2 border dark:text-white"
          >
            <div className="flex max-w-max items-center gap-3">
              <div className="p-2 h-[100%] rounded-full bg-[#fffbf5] dark:bg-gray-800">
                <FiSun size={20} />
              </div>
              <div>
                <h3 className=" text-sm">{position}</h3>
                <h3 className="font-bold text-sm">{experience.place[index]}</h3>
              </div>
            </div>
            <div>
              <h6 className="text-[0.8rem]">{experience.year[index]}</h6>
            </div>
          </div>
          </Link>
        ))}
      </div>
      <div className=" flex  w-[100%]  justify-evenly my-8">
        <div className="flex w-[100%]  border-t  border-gray-500 dark:bg-gray-50"></div>
      </div>
    </div>
  );
}

export default Experience;
