"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-500 via-brand-400 to-yellow-400 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
