import React from 'react'
import { LuGithub, LuLinkedin, LuTwitter, LuMail } from 'react-icons/lu'
import localFont from "next/font/local";
const satoshi = localFont({
    src: "../localfonts/Satoshi-Variable.woff2",
    display: "swap",
  });
type Props = {}

function ProjectFooter({}: Props) {
  return (
    <footer id="contact" className="bg-[#83B4FF] text-white py-12 px-4 mt-4 mx-12 rounded-tl-3xl rounded-tr-3xl">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-3xl">
          <h1 className={`${satoshi.className} text-3xl font-bold text-white uppercase mb-4`}>d<span className="text-red-600 text-3xl">⁕</span>live</h1>
            <p className="text-sm text-gray-400">Passionate full-stack developer creating innovative digital solutions.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#projects" className="text-gray-400 hover:text-blue-300 transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-blue-300 transition-colors">Skills</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-300 transition-colors">Resume</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="bg-slate-800 p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors"><LuGithub size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors"><LuLinkedin size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors"><LuTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-300 transition-colors"><LuMail size={24} /></a>
            </div>
            <p className="text-sm text-gray-400">Email: jane.doe@example.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-[#1e293b] font-semibold">
          © {new Date().getFullYear()} Devyanshu Jadon. All rights reserved.
        </div>
      </footer>
  )
}

export default ProjectFooter