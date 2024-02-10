import React from 'react'
import { FiSun } from "react-icons/fi"
type Props = {}

function Education({}: Props) {
  return (
    <div>
        <h1 className=' text-5xl'>
            Education
        </h1>
        <div className='my-8'>
          <div className='flex  my-4 max-w-max rounded-full items-center gap-2 dark:bg-gray-500 bg-white px-4 py-2 border dark:text-white'><div className='p-2 rounded-full bg-[#fffbf5] dark:bg-gray-800'><FiSun size={20} /></div> <div><h3 className=' text-sm'>Computer Science, B. Tech.</h3><h3 className='font-bold text-sm'>BIST, Bhopal</h3></div><div><h6 className='text-[0.8rem]'>Oct 2022 - Present</h6></div></div>
          <div className='flex  my-4 max-w-max rounded-full items-center gap-2 dark:bg-gray-500 bg-white px-4 py-2 border dark:text-white'><div className='p-2 rounded-full bg-[#fffbf5] dark:bg-gray-800'><FiSun size={20} /></div> <div><h3 className=' text-sm'>In</h3><h3 className='font-bold text-sm'>BIST, Bhopal</h3></div><div><h6 className='text-[0.8rem]'>Oct 2022 - Present</h6></div></div>
          <div className='flex  my-4 max-w-max rounded-full items-center gap-2 dark:bg-gray-500 bg-white px-4 py-2 border dark:text-white'><div className='p-2 rounded-full bg-[#fffbf5] dark:bg-gray-800'><FiSun size={20} /></div> <div><h3 className=' text-sm'>Chief Chair, ACM Student Chapter</h3><h3 className='font-bold text-sm'>BIST, Bhopal</h3></div><div><h6 className='text-[0.8rem]'>Oct 2022 - Present</h6></div></div>
          
        </div>
        <div className=' flex  w-[100%]  justify-evenly my-8'>
            <div className='flex w-[100%]  border-t  border-gray-500 dark:bg-gray-50'></div>
        </div>
    </div>
  )
}

export default Education