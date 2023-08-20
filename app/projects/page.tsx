'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '@/lib/motion';
import { ProjectCard } from '@/components/projects/ProjectCard';

import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';


interface Project {
  company_name: string;
  description: string[];
  start_date: {
    nanoseconds:number,
    seconds:number
  },
  end_date: {
    nanoseconds:number,
    seconds:number
  },
  github?:string,
  inDev:boolean,
  owner_info:string,
  project_link:{
    link:string,
    title:string
  },
  project_name:string,
  stack_used:string[]
}




const Page = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'projects'), orderBy("start_date", "desc"));
      const querySnapshot = await getDocs(q);
      let rawData:Project[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const projectData = doc.data() as Project;
        rawData.push(projectData)
      });
      setProjects(rawData);
    };

    fetchData();
  }, []);

  return (
    <div className=''>
      <motion.div variants={textVariant()} >
        <motion.h1
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 0.6 }}
          className={``}
        >
          <span className='text-5xl text-gradient hover:background-animate mb-1'>What I have done so far.</span>
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-5xl  text-gradient`}
        >
          Projects.
        </motion.h2>
        {/* <div className="hidden dark:block -z-[100] absolute w-[100%] bottom-0 right-0 gradient-03" /> */}
      </motion.div>
      <div className="hidden dark:lg:block -z-[100] overflow-hidden absolute  inset-0 gradient-04" />
      <div className="mt-12 relative grid grid-cols-1 lg:grid-cols-2 gap-12">
        {projects && projects.map((project:any, index:number) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Page;
