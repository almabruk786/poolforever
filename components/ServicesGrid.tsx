"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function ServicesGrid() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Services" title={<>Everything for a flawless water experience.</>} text="From first sketch to long-term care, Pool Forever handles the full pool lifecycle with premium detailing." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.055] p-7 backdrop-blur-xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua to-transparent opacity-0 transition group-hover:opacity-100" />
              <Icon className="mb-8 text-aqua" size={34} />
              <h3 className="font-display text-3xl font-semibold">{title}</h3>
              <p className="mt-4 leading-7 text-white/65">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
