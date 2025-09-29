import { containerVariants, itemVariants } from "@/lib/motion";
import { motion } from "motion/react";

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedDiv({ children, className }: AnimatedProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function AnimatedMain({ children }: AnimatedProps) {
  return <motion.main variants={containerVariants}>{children}</motion.main>;
}
