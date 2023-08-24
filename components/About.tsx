import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Twitter, Linkedin, AtSign } from 'lucide-react';
import { Caveat } from 'next/font/google';
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
});

interface AboutType {
  image: string;
  current_job: string;
  linkedin: string;
}

export const About = () => {
  // Variants for Container of words.
  const containerForWords = {
    hidden: { opacity: 0.5 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.01 * i },
    }),
  };
  // Variants for each word.
  const childWord = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'Inertia',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: 'Inertia',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  const [aboutme, setAboutme] = useState<AboutType[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'about'));
      const querySnapshot = await getDocs(q);
      let rawData: AboutType[] = [];
      querySnapshot.forEach((doc) => {
        const aboutmeData = doc.data() as AboutType;
        rawData.push(aboutmeData);
      });
      setAboutme(rawData);
    };

    fetchData();
  }, []);
  const cardVariants: Variants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      rotate: -10,
      transition: {
        type: 'Spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="global-text-color">Nice to meet you</p>
        <p className="text-5xl">Hi there,</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl"
      >
        I’m{' '}
        <motion.p
          variants={containerForWords}
          initial="hidden"
          animate="visible"
          className="text-6xl inline-block text-gradient-black dark:text-gradient-reverse"
        >
          {['Mohd', ' ', 'Faiz'].map((word) => (
            <motion.span
              key={word}
              variants={childWord}
              className={`${caveat.className} pr-1`}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:max-w-3xl tracking-wide leading-6 mt-3 font-light"
      >
        I am a versatile developer passionate about creating stunning web UIs
        while excelling in backend coding. Solving new challenges fuels my
        drive, as I actively engage in developer events to stay at the forefront
        of innovation. With a knack for blending aesthetics and functionality, I
        thrive on crafting seamless user experiences.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-80 max-w-2xl mt-12"
      >
        <div className="aspect-video relative ">
          {aboutme ? (
            <div className="">
              <div className=" ">
                <Image
                  src={aboutme[0].image}
                  alt="Faiz Pic"
                  className="object-cover glassmorphism rounded md:glassmorphism"
                  fill
                />
              </div>
            </div>
          ) : (
            <div className="h-80  relative">
              <div className="aspect-video">
                <Skeleton className="border" height={300} />
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial={{ opacity: 0.3 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        className="mt-24"
      >
        <h3 className="global-text-color">Summary</h3>
        <p className="text-3xl my-3 tracking-wide">
          Intersection of problems, solution and Developer
        </p>
        <motion.p
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="md:max-w-3xl font-light mb-10 tracking-wide leading-6"
        >
          Thanks to my study background in Computer Science, I connect client
          requirements with real business goals while providing delightful user
          experience.
        </motion.p>
      </motion.div>

      <div className="md:max-w-2xl font-light tracking-wide   leading-6">
        {aboutme ? (
          <motion.p
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.8 }}
            className="mb-10"
          >
            {parse(aboutme[0].current_job)}
          </motion.p>
        ) : (
          <div className="h-4 mb-10">
            <Skeleton />
          </div>
        )}
        <motion.p
          initial={{ opacity: 0.1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="mb-10"
        >
          Outside of my full-time commitments, I work with a select freelance
          client base to create amazing products and solutions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0.1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="mb-10"
        >
          I’m passionate about building & designing thoughtful experiences to
          make sure the problem is solved and users are satisfied when they’re
          using products and services online.
        </motion.p>

        <motion.p
          initial={{ opacity: 0.1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="mb-10"
        >
          I also love documenting my journey and sharing it with the community (
          <a
            href="https://twitter.com/mdfaiz_afk"
            target="_blank"
            className="text-[#55ACEF]"
          >
            Twitter
          </a>
          ) to help others succeed and grow.
        </motion.p>
        <h3 className="global-text-color">Why coding?</h3>
        <p className="">
          <del>Passion🎃</del>&nbsp;<del>Money</del>&nbsp;
          <span className={`${caveat.className} text-2xl`}>Passion</span>
        </p>
      </div>

      {/* Twitter, Linkedin, AtSign, SendHorizontal */}
      <div className="h-[1px] md:max-w-3xl rounded-full  bg-foreground mt-12" />
      <div className="mt-24 text-center md:max-w-3xl ">
        <p className="global-text-color text-xs">
          Below are my social handles.
        </p>
        <p
          className={`${caveat.className} text-gradient-black dark:text-gradient-reverse text-6xl`}
        >
          Connect With Me
        </p>
        <div className="flex justify-center mt-6 gap-2">
          
          <a
            href="https://twitter.com/mdfaiz_afk"
            target="_blank"
            className="cursor-pointer dark:shadow-white border rounded-lg p-2 hover:shadow-md "
          >
            <Twitter />
          </a>
          {aboutme && (
            <a
              href={`${aboutme[0].linkedin}`}
              target="_blank"
              className="cursor-pointer dark:shadow-white border rounded-lg p-2 hover:shadow-md "
            >
              <Linkedin />
            </a>
          )}
          <a
            href="mailto:mdfaiz.afk@gmail.com"
            className="cursor-pointer dark:shadow-white border rounded-lg p-2 hover:shadow-md "
          >
            <AtSign />
          </a>
          {/* <a href="whatsapp://send?text=Hello%20from%20my%20website" className='cursor-pointer border rounded-lg p-2 hover:shadow-md '>
              <SendHorizontal />
          </a> */}
        </div>
      </div>
    </section>
  );
};
