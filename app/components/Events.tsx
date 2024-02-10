import Link from 'next/link'
import React from 'react'
import { FiSun } from "react-icons/fi"
type Props = {}

function Events({}: Props) {
  const events = {
    event: ["ACM Annual Conference", "Intro to Git & GitHub Workshop", "Road Less Travelled: Introduction to COBOL"],
    redirect: ["https://event.india.acm.org/annualevent/2023-event/#:~:text=ACM%20India%20announces%20its%20annual,the%2011th%20of%20February%202023.", "https://www.youtube.com/watch?v=JjugndXIflo", "https://community.ibm.com/community/user/ibmz-and-linuxone/groups/community-home/digestviewer/viewthread?MessageKey=42152b33-6230-4352-85a2-74437f8a87f5&CommunityKey=27b746cd-ca36-49bb-a1ad-01e7aec7d9aa&tab=digestviewer"],
    place: ["OIST, Bhopal", "Online", "Online"],
    time: ["11th Feb, 2023", "17th Oct 2021", "9th Feb, 2021"]
  }
  return (
    <div>
        <h1 className=' lg:text-5xl md:text-5xl sm:text-5xl text-4xl'>
            Events and Recognisation
        </h1>
        <div className='my-8'>
        {events.event.map((event, index) => (
          <Link href={events.redirect[index]}>
            <div
            key={index}
            className="flex justify-between  my-4 w-full lg:w-[75%] md:w-[75%] sm:w-[75%] rounded-full items-center gap-2 dark:bg-gray-500 bg-white px-4 py-2 border dark:text-white"
          >
            <div className="flex max-w-max items-center gap-3">
              <div className="p-2 h-[100%] rounded-full bg-[#fffbf5] dark:bg-gray-800">
                <FiSun size={20} />
              </div>
              <div>
                <h3 className=" text-sm">{event}</h3>
                <h3 className="font-bold text-sm">{events.place[index]}</h3>
              </div>
            </div>
            <div>
              <h6 className="text-[0.8rem]">{events.time[index]}</h6>
            </div>
          </div>
          </Link>
        ))}
          
        </div>
        
    </div>
  )
}

export default Events





