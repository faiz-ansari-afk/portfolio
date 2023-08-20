import React, { useEffect, useState } from 'react';
import { Home, FolderKanban, BadgeCheck, User2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const BottomNavbar = () => {
  const pathname = usePathname();

  const Options = [
    {
      name: 'Home',
      id: 'home',
      icon: <Home />,
      goto: '/',
    },
    {
      name: 'Projects',
      id: 'projects',
      icon: <FolderKanban />,
      goto: '/projects',
    },
    {
      name: 'Experiences',
      id: 'experiences',
      icon: <BadgeCheck />,
      goto: '/experiences',
    },
    {
      name: 'About',
      id: 'about',
      icon: <User2 />,
      goto: '/about',
    },
  ];
  return (
    <div className="fixed  md:container border-t bottom-0  backdrop-blur-lg left-0 right-0 z-20 ">
      <ul className="flex justify-between items-between md:hidden">
        {Options.map((opt, ind) => {
          return (
            <Link href={opt.goto} key={ind}>
              <AnimatePresence>
                <li
                  className={`flex  items-center justify-center my-4 mx-2 hover:bg-secondary transition delay-100  ease-in cursor-pointer p-3  rounded-lg ${
                    pathname === opt.goto && 'bg-secondary'
                  }`}
                  key={ind}
                >
                  <span>{opt.icon}</span>
                  {pathname === opt.goto && (
                    <motion.span
                      className="pl-2 "
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                    >
                      {opt.name}
                    </motion.span>
                  )}
                </li>
              </AnimatePresence>
            </Link>
          );
        })}
      </ul>
      <ul className=" justify-between items-between hidden md:flex">
        {Options.map((opt, ind) => {
          return (
            <Link href={opt.goto} key={ind}>
              <AnimatePresence>
                <li
                  className={`flex  items-center justify-center my-4 mx-2 hover:bg-secondary transition delay-100  ease-in cursor-pointer p-3  border-foreground rounded-lg ${
                    pathname === opt.goto && 'bg-secondary'
                  }`}
                  key={ind}
                >
                  <span>{opt.icon}</span>
                  <motion.span
                    className="pl-2 "
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                  >
                    {opt.name}
                  </motion.span>
                </li>
              </AnimatePresence>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default BottomNavbar;
