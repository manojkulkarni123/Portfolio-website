"use client";
import { motion } from "motion/react";

/** Blur-fade-in on scroll. */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.04 + delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
