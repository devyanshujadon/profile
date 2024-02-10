import React from 'react'

type Props = {}

function TaglineSection({}: Props) {
  return (
    <div className='flex flex-col'>
        <h1 className=' text-4xl   text-wrap '>
        Innovating with Passion, Coding with Purpose: Welcome to My Digital Journey
        </h1>
        <div className='flex gap-12 my-8 '>
            <button className='bg-gray-800 text-[#fff] border px-6 py-2 gap-12 rounded-3xl'>Resume</button>
            <button className='bg-[#fff] text-[#000] border px-6 py-2 gap-12 rounded-3xl'>Projects</button>
        </div>
        <div className=' flex  w-[100%]  justify-evenly my-8'>
            <div className='flex w-[100%]  border-t  border-gray-500 dark:bg-gray-50'></div>
        </div>
    </div>
  )
}

export default TaglineSection