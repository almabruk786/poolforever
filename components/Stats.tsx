"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(useSpring(count, { duration: 1600, bounce: 0 }), (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) count.set(value);
  }, [count, inView, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-white/[.03] px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-[2rem] p-7 text-center">
            <div className="font-display text-5xl font-bold text-white">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm uppercase tracking-[.22em] text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
