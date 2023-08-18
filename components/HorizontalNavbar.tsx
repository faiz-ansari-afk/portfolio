'use client';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { navVariants } from './../lib/motion';

const HorizontalNavbar = () => {
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className="relative  flex items-center justify-between my-4 md:my-6"
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <h1 className="text-3xl tracking-wide">Faiz Shamsuddin</h1>
      <ThemeToggle />
    </motion.nav>
  );
};

export default HorizontalNavbar;
