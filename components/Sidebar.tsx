'use client';
import React from 'react';
import { Home, FolderKanban, BadgeCheck, User2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Sidebar = () => {
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
    <motion.aside 
    initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
    className="h-full relative  w-fit flex">
      <ul className="space-y-8 select-none ">
        {Options.map((opt, ind) => {
          return (
            <Link href={opt.goto} key={ind}>
              <li
                className={`flex my-3 hover:bg-secondary transition delay-100 first:mt-0 ease-in cursor-pointer pl-3 pr-5 py-3 rounded-lg ${
                  pathname === opt.goto && 'bg-secondary'
                }`}
                key={ind}
              >
                <div className=" flex flex-row items-center justify-center gap-2">
                  {opt.icon}
                  <p>{opt.name}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
