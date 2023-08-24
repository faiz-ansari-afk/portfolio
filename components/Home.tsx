'use-client';
import { motion } from 'framer-motion';
import SkillsNormal from './Skills3D/SkillsNormal';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
});
const Home = () => {
  const summary = [
    <span key="unique">
      <span
        className={`${caveat.className} text-3xl pr-1 text-gradient-black dark:text-gradient-reverse`}
      >
        Computer Science
      </span>{' '}
      graduate with a knack for learning new things and stay updated with market.
    </span>,
    'Skilled in ReactJS for creating impressive front-end designs.',
    'Effective communicator known for building strong relationships within teams.',
    <span key="uni">
      Currently learning <span className="text-[#2496ED]">Docker</span> to
      enhance my skills in creating, managing, and deploying applications within
      isolated and reproducible environments.
    </span>,
  ];
  return (
    <>
      <motion.div key="home component">
        <motion.h1
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 0.6 }}
          className="pb-4 font-bold text-gradient  leading-wide text-6xl "
        >
          <span className="hover:text-gradient-reverse  hover:background-animate">
            Computer Science Engineer
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {summary.map((sum,ind) => (
            <p
              key={ind}
              className=" global-text-color  text-xl my-2 tracking-wide  max-w-4xl"
            >
              <span className="text-foreground">&gt;&nbsp;</span>
              {sum}
            </p>
          ))}
          <h3 className=" global-text-color mt-32 text-3xl md:text-4xl ">
            Skills utilized till now:
          </h3>
        </motion.div>
        <div className=" max-w-4xl ">
          <SkillsNormal />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
