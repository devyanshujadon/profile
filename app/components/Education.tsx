import React from "react";
import { FiSun } from "react-icons/fi";
type Props = {};

function Education({}: Props) {
  const education = {
    course: ["B. Tech. Computer Science", "Senior Secondary Education"],
    institute: ["Bansal Institute, Bhopal", "International Pubic School"],
    year: ["Sept 2020 - Present", "Apr 2019 - June 2020"],
    redirect: []
  };

  return (
    <div>
      <h1 className=" lg:text-5xl md:text-5xl sm:text-5xl text-4xl">Education</h1>
      <div className="my-8 ">
        {education.course.map((course, index) => (
          <div
            key={index}
            className="flex my-4 w-full lg:w-[75%] md:w-[75%] sm:w-[75%] justify-between rounded-full items-center gap-2 dark:bg-gray-500 bg-white px-4 py-2 border dark:text-gray-100"
          >
            <div className="flex max-w-max items-center gap-3">
            <div className="p-2 h-[100%] rounded-full bg-[#fffbf5] dark:bg-gray-800">
              <FiSun size={20} />
            </div>
            <div>
              <h3 className="text-sm">{course}</h3>
              <h3 className="font-bold text-sm">
                {education.institute[index]}
              </h3>
            </div>
            </div>
            <div>
              <h6 className="text-[0.8rem]">{education.year[index]}</h6>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex  w-[100%]  justify-evenly my-8">
        <div className="flex w-[100%]  border-t  border-gray-500 dark:bg-gray-50"></div>
      </div>
    </div>
  );
}

export default Education;
