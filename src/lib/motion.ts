import { Variants } from "motion/react";

export const containerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // custom bezier for smoothness
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1], // smooth exit
    },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    scale: [0.95, 1],
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 1,
    },
  },
};
