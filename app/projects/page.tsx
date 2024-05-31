
import React from 'react'
import "../globals.css";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectsHero from '../components/ProjectsHero';

type Props = {}

function Projects({}: Props) {
  return (
  
    <div className='flex flex-col gap-12 '>
      <ProjectsHeader />
      <ProjectsHero />
    </div>
      
  
  )
}

export default Projects