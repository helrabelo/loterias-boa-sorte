// app/template.tsx
'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: { 
    opacity: 0,
  },
  enter: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0] 
    }
  }
};

const childVariants = {
  initial: { 
    opacity: 0,
    y: 8 
  },
  enter: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: 8,
    transition: { 
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0]
    }
  }
};

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="lg:col-span-9"
      >
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}