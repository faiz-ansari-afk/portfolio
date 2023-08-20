import { technologies as cards } from './contants';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import StarWrapper from './SectionWrapper';

 const SkillsNormal = () => {
  return (
    <div className='flex flex-wrap justify-between md:justify-start '>
        {cards.map((card, i) => (
          <motion.div
            initial={{opacity:0, translateX:i%2===0 ? -50 : 50, translateY:-50}}
            // animate={{opacity:1, translateX:0,translateY:0}}
            transition={{duration:0.3, delay: i * 0.12}}
            whileInView={{ opacity:1, translateX:0,translateY:0 }}
            viewport={{ once: false }}
            className={` card relative border inline-block items-center justify-center h-16  w-16 md:h-20 md:w-20 b m-2 md:m-3  rounded-md cursor-pointer`}
            key={card.id}
          >
            <div className={`${card.name === 'Nextjs' && 'bg-white rounded-full'} h-full w-full flex items-center justify-center`}>
              <Image src={card.icon} alt={card.name} fill title={card.name} />
            </div>
          </motion.div>
        ))}
    </div>
  )
}
export default StarWrapper(SkillsNormal);
