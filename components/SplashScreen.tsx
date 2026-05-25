"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-abyss"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute h-[26rem] w-[26rem] rounded-full border border-aqua/25 shadow-glow" />
          <div className="absolute h-[20rem] w-[20rem] animate-ripple rounded-full border border-aqua/40" />
          <div className="absolute h-[30rem] w-[30rem] animate-ripple rounded-full border border-aqua/15 [animation-delay:.7s]" />
          <div className="water-surface" />
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-8"
          >
            <div className="grid h-24 w-24 place-items-center rounded-[1.7rem] bg-aqua text-5xl font-black text-white shadow-glow">P</div>
            <Logo />
            <div className="h-px w-56 overflow-hidden bg-white/10">
              <motion.div className="h-full bg-aqua" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
