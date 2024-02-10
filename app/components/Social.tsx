import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithubAlt } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";
type Props = {};

function Social({}: Props) {
  return (
    <div className="flex max-w-max gap-6">
      <div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><FaGithubAlt size={20} /></div>
      <div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><FaXTwitter size={20} /></div>
      <div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><FaLinkedinIn size={20} /></div>
      <div className="p-2  border border-slate-200 dark:border-slate-400 bg-white rounded-full dark:bg-gray-800"><MdEmail size={20} /></div>
      
      
      
    </div>
  );
}

export default Social;
