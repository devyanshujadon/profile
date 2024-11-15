import Link from 'next/link'
import React from 'react'

type Props = {}

function TaglineSection({}: Props) {
  return (
    <div className='flex flex-col my-4'>
        <h1 className=' lg:text-5xl md:text-5xl sm:text-5xl text-4xl   text-wrap dark:text-gray-300 '>
        Creating with Passion, Coding with Purpose: Welcome to My Journey!
        </h1>
        <div className='flex gap-12 my-8 '>
            <Link href={"/"}><button className='bg-gray-800 text-[#fff] border px-6 py-2 gap-12 rounded-3xl'>Resume</button></Link>
            <Link href={"/projects"}><button className='bg-[#fff] text-[#000] border px-6 py-2 gap-12 rounded-3xl'>Projects</button></Link>
        </div>
        <div className=' flex  w-[100%]  justify-evenly my-8'>
            <div className='flex w-[100%]  border-t  border-gray-500 dark:bg-gray-50'></div>
        </div>
    </div>
  )
}

export default TaglineSection

