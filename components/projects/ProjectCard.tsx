import Beam from './Beam';
import { motion } from 'framer-motion';
import { convertFirebaseTimestampToJSDate } from './../../lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import { BadgeButton } from '../BadgeButton';

type Project = {
  title: string;
  description: string;
};

type ProjectCardProps = {
  project: any; // Specify the type for the 'project' prop
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  function getImageFromName(
    name: string
  ): React.ReactElement | null | undefined {
    const imageName = name.toLowerCase();
    switch (imageName) {
      case 'nextjs':
        return <Image src="/tech/nextjs.512x512.png" fill alt="NextJS" />;
      case 'reactjs':
        return <Image src="/tech/reactjs.png" fill alt="ReactJS" />;
      case 'strapi':
        return <Image src="/tech/strapi.png" fill alt="Strapi" />;
      case 'tailwind':
        return <Image src="/tech/tailwind.png" fill alt="Tailwind css" />;
      case 'postgres':
        return <Image src="/tech/postgresql.png" fill alt="Postgres SQL" />;
      case 'firebase':
        return <Image src="/tech/firebase.png" fill alt="Firebase" />;
      case 'typescript':
        return <Image src="/tech/typescript.png" fill alt="Typescript" />;
      case 'docker':
        return <Image src="/tech/docker.png" fill alt="Docker" />;
      case 'github':
        return <Image src="/tech/github.png" fill alt="Github" />;
      case 'framer':
        return <Image src="/tech/framer.png" fill alt="Framer" />;
      case 'wordpress':
        return <Image src="/tech/wordpress.webp" fill alt="Wordpress" />;

      default:
        return null;
    }
  }
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  return (
    <div
      className="relative"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0 }}
        // variants={{
        //   hidden: { opacity: 0, y: 0, scale: 1, rotateX: 45 },
        //   visible: {
        //     opacity: 1,
        //     y: [0, -20, 0],
        //     scale: [1, 1.2, 1],
        //     rotateX: 0,
        //   },
        // }}
        variants={{
          hidden: { opacity: 0.1, y: 0, scale:0.8, rotateX: -10 },
          visible: {
            opacity: 1,
            y: [0, -20, 0],
            scale: 1,
            rotateX: 0,
          },
        }}
        className="  border dark:border-0  rounded-md bg-gradient-to-tl from-gray-100 via-gray-50 to-white  dark:bg-gradient-to-tl dark:from-gray-700 dark:via-gray-900 dark:to-black  relative overflow-hidden"
      >
        {/* Two Beams that run on top of the container */}
        <Beam className="top-0" />
        <Beam className="top-0" />

        <div className=" p-3 ">
          <h3 className="text-gradient-black dark:text-gradient-reverse text-3xl">
            {project.project_name}
          </h3>
          <div className="flex gap-3 items-center">
            <p className="font-light tracking-wide text-gray-600">
              {project.company_name}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">
                {convertFirebaseTimestampToJSDate(project.start_date)}
              </span>
              <span className=" h-0.5 w-6 bg-gray-400 rounded-full"></span>
              <span className="text-gray-400">
                {convertFirebaseTimestampToJSDate(project.end_date)}
              </span>
            </div>
          </div>
          <ul className="my-2 space-y-1">
            {project.description.map((des: string[], ind: number) => (
              <motion.li
                onClick={() => setSelectedLine(ind)}
                className={`${
                  selectedLine === ind ? '' : 'line-clamp-1'
                } cursor-pointer font-light dark:text-gray-300`}
                key={ind}
                initial={{ opacity: 0 }} // Initial opacity when the component mounts
                animate={{ opacity: 1 }} // Opacity when the component is visible
                exit={{ opacity: 0.5 }}
                whileTap={{ scale: 0.95 }} // Scale down when clicked
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: selectedLine === ind ? 90 : 0 }}
                  style={{ display: 'inline-block' }}
                >
                  &gt;
                </motion.span>{' '}
                {des}
              </motion.li>
            ))}
          </ul>
          <h3 className="mt-8 text-gray-400 text-md mb-2">Stack Used:</h3>
          <ul className="flex gap-3">
            {project.stack_used.map((stack: string, ind: number) => (
              <li
                className="w-8 h-8 relative dark:bg-foreground rounded-full"
                key={ind}
                title={stack}
              >
                {getImageFromName(stack)}
              </li>
            ))}
          </ul>

          <div className="flex mt-8 gap-4">
            <BadgeButton text="Live" link={project.project_link.link} />
            {project.github && (
              <button className="text-xs bg-background py-0.5 px-4 button-85">
                <a
                  href={project.github}
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </button>
            )}
          </div>
        </div>
        <div className="absolute right-0 bottom-0 lg:w-64 lg:h-40 md:h-32 md:w-44">
          {/* <div className="relative w-full h-full hidden">
          <Image src={project.cover_image} fill alt="Cover Image" className="opacity-60 rounded-tl-xl" 
          style={{
              clipPath: "polygon(35% 0%, 100% 0, 100% 100%, 0 100%, 0 33%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)" // Set your desired background color here
            }} 
            />
          {[1,2,3,4,5].map((s,i)=>(
            <div key={i} 
            
             className="rounded-tl-lg absolute top-0 left-0 h-16 w-24  bg-gradient-to-tl from-transparent via-transparent to-gray-50  dark:bg-gradient-to-tl dark:from-transparent dark:via-transparent dark:to-black" />
            ))}
        </div> */}
        </div>
        {/* A bottom gradient that looks cute */}
        <div className="z-0 ">
          <div className="absolute bottom-0 right-4 mt-[2px] flex h-8 items-end overflow-hidden">
            <div className="flex -mb-px h-[2px] w-80 -scale-x-100">
              <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
              <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
