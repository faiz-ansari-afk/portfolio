'use client';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { convertFirebaseTimestampToJSDate } from './../lib/utils';


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
});

type FirebaseDate = {
    nanoseconds: number;
    seconds: number;
}
interface Experience {
  company_name: string;
  position: string;
  description: string[];
  start_date: FirebaseDate;
  end_date: FirebaseDate | string;
  company_website?: string;
  project_name: string;
  logo?: string;
  notice_period?:boolean;
  stacks:string[];
}

export const Experience = () => {
  const [experience, setExperience] = useState<Experience[] | null>(null);
  const cardVariants: Variants = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 50,
      rotate: -10,
      transition: {
        type: "Spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, 'experience'),
        orderBy('start_date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      let rawData: Experience[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const projectData = doc.data() as Experience;
        rawData.push(projectData);
      });
      setExperience(rawData);
    };

    fetchData();
  }, []);
  interface LineInfo {
    cardNo: number;
    lineNo: number;
  }
  

  const [selectedLine, setSelectedLine] = useState<LineInfo | null>(null);
  function getTotalMonthExp(start_date:FirebaseDate , end_date:FirebaseDate ):string {
    // Convert seconds and nanoseconds to milliseconds
    const startMillis = start_date.seconds * 1000 + start_date.nanoseconds / 1e6;
    const endMillis = end_date.seconds * 1000 + end_date.nanoseconds / 1e6;
    
    const startDate = new Date(startMillis);
    const endDate = new Date(endMillis);
    
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const startMonth = startDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed month
    const endMonth = endDate.getMonth() + 1;
    
    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    
    if (totalMonths < 12) {
        return totalMonths + " Month" + (totalMonths === 1 ? "" : "s");
    } else {
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        return years + " Yr" + (years === 1 ? "" : "s") + " " + months + " Month" + (months === 1 ? "" : "s");
    }
}
function convertToTimestamp(date:number):FirebaseDate  {
  const seconds = Math.floor(date / 1000);
  const nanoseconds = (date % 1000) * 1e6; // Convert milliseconds to nanoseconds
  return { seconds, nanoseconds };
}
  return (
    <div className="lg:max-w-4xl  ">
      <motion.div key="home component" className=''>
        <motion.h1
          // variants={zoomIn}
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 0.6 }}
          className="pb-4  font-bold text-gradient  leading-wide text-5xl md:text-6xl "
        >
          <span className="hover:text-gradient-reverse  hover:background-animate">
            Experiences
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className=" text-gradient text-3xl">Companies and organizations I stayed in.</span>
        </motion.div>
      </motion.div>
      <motion.ol 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      
      className="relative border-l expborder border-gray-700 dark:border-gray-300 ml-2">
        {experience ?
          experience.map((exp, index) => {
              let modifyEndDate: FirebaseDate | undefined;
              if(exp.end_date === 'present'){
                modifyEndDate = convertToTimestamp(Date.now());
              }else{
                modifyEndDate = exp.end_date as FirebaseDate;
              }
              const totalMonth = getTotalMonthExp(exp.start_date,modifyEndDate)
              console.log("totalMonth",totalMonth);
            return(
            <motion.li 
            variants={cardVariants}
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.8 }}
            className={`${exp.end_date === 'present' && ' '} mb-10 ml-6`} key={index}>
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                {exp.logo && (
                  <Image
                    src={exp.logo}
                    fill
                    className="rounded-full"
                    alt={`${exp.company_name} logo`}
                  />
                )}
              </span>
              <div className={`relative items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600 ${exp.end_date === 'present' && 'green-box-shadow'}`}>
              
                {exp.notice_period && <span className={`${caveat.className} absolute text-rose-500 dark:text-rose-300 left-1 -top-1`}>serving notice period</span>}
                <div className="text-sm font-normal text-gray-500  dark:text-gray-300">
                  <div className="flex justify-between flex-col md:flex-row">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-wide">
                      {exp.position} 
                    </h3>
                    <div className=' '>
                      <time className="mb-1 text-xs font-normal text-gray-400 flex gap-1">
                        <span className="flex-shrink-0">{convertFirebaseTimestampToJSDate(exp.start_date)}</span>
                        <span className="flex-shrink-0">-</span>
                        {typeof exp.end_date === 'string' ? (
                          <span className="flex-shrink-0 text-lime-600">present</span>
                        ) : (
                          <span className="flex-shrink-0">{convertFirebaseTimestampToJSDate(exp.end_date)}</span>
                        )}
                      </time>
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-gradient-black dark:text-gradient-reverse">
                    {exp.company_name}
                  </h3>
                  <p className="mt-4 ">Project: {exp.project_name} <span className='font-light text-gray-400 text-xs'>&nbsp;&nbsp;{totalMonth}</span></p>
                  <ul className="my-2 space-y-1">
                    {exp.description.map((des, ind) => (
                      <motion.li
                        onClick={() =>
                          setSelectedLine(() => ({
                            cardNo: index,
                            lineNo: ind,
                          }))
                        }
                        className={`${
                          selectedLine &&
                          selectedLine.cardNo === index &&
                          selectedLine.lineNo === ind
                            ? ''
                            : 'line-clamp-1'
                        } cursor-pointer font-light dark:text-gray-300`}
                        key={ind}
                        initial={{ opacity: 0 }} // Initial opacity when the component mounts
                        animate={{ opacity: 1 }} // Opacity when the component is visible
                        exit={{ opacity: 0.5 }}
                        whileTap={{ scale: 0.95 }} // Scale down when clicked
                      >
                        <motion.span
                          initial={{ rotate: 0 }}
                          animate={{
                            rotate:
                              selectedLine &&
                              selectedLine.cardNo === index &&
                              selectedLine.lineNo === ind
                                ? 90
                                : 0,
                          }}
                          style={{ display: 'inline-block' }}
                        >
                          &gt;
                        </motion.span>{' '}
                        {des}
                      </motion.li>
                    ))}
                  </ul>
                  <div className='mt-5 flex gap-3 text-xs flex-wrap'>
                    {exp.stacks.map(stack=>(
                      <p className="rounded-lg flex-shrink-0 px-3 py-1 border dark:border-0  bg-background text-foreground text-xs" key={stack}>{stack}</p>
                    ))}
                    </div>
                </div>
                
              </div>
            </motion.li>
          )})
        :(<>
          {[1,2].map(key=>(<li key={key} className={` mb-10 ml-6`} >
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 animate-pulse">
                <Skeleton circle />
              </span>
              <div className="items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                
              <div className="text-sm font-normal text-gray-500  dark:text-gray-300">
                  <div className="flex justify-between">
                    <h3 className="text-2xl w-64 h-4 font-bold tracking-wide">
                      <Skeleton />
                    </h3>
                  </div>
                  <h3 className="mt-3 h-3 w-44">
                  <Skeleton />
                  </h3>
                  <p className="mt-5 h-3 w-32 "><Skeleton /></p>
                  <ul className="mt-5 space-y-2 w-[300px] md:w-[42rem] ">
                    {[1,2,3,4].map(skel => (
                      <li className="h-3  w-full" key={skel}>
                        <Skeleton />
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
            </li>))}
            </>
        )
        }

        <motion.li
        variants={cardVariants}
        initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.8 }}
        className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <Image
              src="/rizvi.png"
              fill
              className="rounded-full"
              alt="rizvi college logo"
            />
          </span>
          <div className="items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <time className="mb-1 text-xs font-normal text-gray-400 order-last sm:mb-0">
              2017 - 2021
            </time>
            <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
              <h3 className="text-2xl font-bold tracking-wide">
                Bachelor of Engineering
              </h3>
              <h3 className="text-xl font-light">
                Rizvi College of Engineering
              </h3>
              <p className="text-sm font-light text-gray-400 my-1">
                Carter Road, Bandra West.
              </p>
              <p className="text-gray-400 font-light">
                Computer Science <span className="font-bold">(77%)</span> or{' '}
                <span className="font-bold">(8.79 CGPA)</span>
              </p>
            </div>
          </div>
        </motion.li>
        <motion.li
        variants={cardVariants}
        initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.8 }}
        className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <Image
              src="/kmes.png"
              fill
              className="rounded-full"
              alt="kmes college logo"
            />
          </span>
          <div className="items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
              2015 - 2017
            </time>
            <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
              <h3 className="text-2xl font-bold tracking-wide">H.S.C</h3>
              <h3 className="text-xl font-light">K.M.E.S Junior College.</h3>
              <p className="text-sm font-light text-gray-400 my-1">
                Thane Road, Bhiwandi 421 302.
              </p>
              <p className="text-gray-400 font-light">
                Maharashtra State Board{' '}
                <span className="font-bold">(79.80%)</span>
              </p>
            </div>
          </div>
        </motion.li>
        <motion.li
        variants={cardVariants}
        initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.8 }}
        className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-rose-300 rounded-full -left-3 ring-8 ring-gray-100 dark:ring-gray-900 dark:bg-blue-900">
            <Image
              src="/alummat.png"
              fill
              className="rounded-full"
              alt="al ummat school logo"
            />
          </span>

          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <div className="items-start justify-between mb-3 sm:flex">
              <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                2005 - 2015
              </time>
              <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                <h3 className="text-2xl font-bold tracking-wide">S.S.C</h3>
                <h3 className="text-xl font-light">
                  Al-Ummat English High School.
                </h3>
                <p className="text-sm font-light text-gray-400 my-1">
                  Khadipar, Bhiwandi 421 302.
                </p>
                <p className="text-gray-400 font-light">
                  Maharashtra State Board{' '}
                  <span className="font-bold">(88.80%)</span>
                </p>
              </div>
            </div>
          </div>
        </motion.li>
      </motion.ol>
    </div>
  );
};
