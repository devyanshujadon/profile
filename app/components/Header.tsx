'use client'
import React from 'react'
import { useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import { HiMenuAlt1 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

type Props = {}

function Header({}: Props) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header  className={`backdrop-blur-sm ${isOpen ? 'h-screen bg-[#dab173] dark:bg-gray-800' : 'h-14 items-center bg-[#fffbf500]'}  flex gap-4  justify-between  container lg:px-32 fixed `}>
        <div className='flex gap-4 h-14 items-center'><h1 className='font-medium'>Devyanshu</h1></div>
        <div className='hidden lg:flex md:flex sm:flex gap-4'>
            <ul className='flex gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='flex gap-4 h-14 items-center'>
        <div className='flex gap-4'> 
            <ThemeSwitch />
        </div>
        <button className='lg:hidden sm:hidden md:hidden flex hover:bg-gray-200  dark:hover:bg-gray-800' onClick={toggleMenu}>
          {isOpen ? ( <MdClose size={20} /> ) : ( <HiMenuAlt1 size={20} />)}
        </button>
        </div>
        {isOpen && (
        <div className="fixed">
          <ul className='fixed flex flex-col lg:hidden sm:hidden md:hidden  gap-12 top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 text-xl'>
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header