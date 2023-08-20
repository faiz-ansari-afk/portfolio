'use-client';
import { motion, AnimatePresence } from 'framer-motion';
// import Tech from './Skills3D/Tech';
import { SkillsCard } from './Skills3D/SkillsCard';

const Home = () => {
  const summary = [
    "Computer Science graduate with a knack for learning new coding languages in under a month.",
          "Skilled in ReactJS for creating impressive front-end designs.",
          "Effective communicator known for building strong relationships within teams.",
          "Currently learning Docker to make front-end work even better."
  ]
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
          {summary.map(sum => (

          <p key={sum} className=" global-text-color  text-xl my-2 tracking-wide  max-w-4xl">
            <span className="text-foreground">&gt;&nbsp;</span>{sum}
          </p>
          ))}
          <h3 className=" global-text-color mt-32 text-4xl underline">
            Skills utilized till now:
          </h3>
        
        <div className=" p-3 max-w-4xl ">
          {/* <div className="hidden dark:block -z-[100] absolute w-[100%] inset-0 gradient-03" /> */}
          <SkillsCard />
        </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
