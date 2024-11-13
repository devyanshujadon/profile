

import React from 'react'
import "../globals.css";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectsHero from '../components/ProjectsHero';
import ProjectsSection from '../components/ProjectsSection';
import { CustomScroll } from "react-custom-scroll";
import ProjectFooter from '../components/ProjectFooter';

type Props = {}

function Projects({}: Props) {


  
  return (
    
    
      <div className='  w-full h-[200vh]'>
        
        <ProjectsHeader/>
        <div className='relative flex flex-col gap-8'>
        <ProjectsHero/>
        <ProjectsSection/>
        <ProjectFooter/>
        </div>
      </div>
    
      
  
  )
}

export default Projects