'use client';

import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const variants = {
    up: {
      hidden: {
        opacity: 0,
        y: 40,
      },
      show: {
        opacity: 1,
        y: 0,
      },
    },

    left: {
      hidden: {
        opacity: 0,
        x: -50,
      },
      show: {
        opacity: 1,
        x: 0,
      },
    },

    right: {
      hidden: {
        opacity: 0,
        x: 50,
      },
      show: {
        opacity: 1,
        x: 0,
      },
    },
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
