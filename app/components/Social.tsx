import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithubAlt } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";
type Props = {};

function Social({}: Props) {
  return (
    <div className="flex max-w-max gap-6 dark:text-gray-300">
      
      <Link href="https://github.com/devyanshujadon"><div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full  dark:bg-gray-800"><FaGithubAlt size={20} /></div></Link>
      <Link href="https://twitter.com/DevyanshuJadon"><div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><FaXTwitter size={20} /></div></Link>
      <Link href="https://www.linkedin.com/in/devyanshu-jadon/"><div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><FaLinkedinIn size={20} /></div></Link>
      <Link href="mailto:jadon.devyanshu@gmail.com"><div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><MdEmail size={20} /></div></Link>
      
      
      
      
    </div>
  );
}

export default Social;
