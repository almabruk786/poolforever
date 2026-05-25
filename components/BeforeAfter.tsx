"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";

export function BeforeAfter() {
  const [value, setValue] = useState(55);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeading center eyebrow="Transformation" title={<>Before and after, built for instant desire.</>} text="A premium comparison slider to show renovation impact and help customers imagine their own pool upgrade." />
        <div className="glass relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem]">
          <img className="absolute inset-0 h-full w-full object-cover grayscale" src="/gallery/indoor.svg" alt="Before renovation" />
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${value}%` }}>
            <img className="h-full w-[min(90vw,80rem)] max-w-none object-cover" src="/gallery/hero-pool.svg" alt="After pool renovation" />
          </div>
          <div className="absolute inset-y-0 w-1 bg-aqua shadow-glow" style={{ left: `${value}%` }} />
          <input aria-label="Before after comparison" className="absolute inset-x-8 bottom-8 accent-aqua" type="range" min="8" max="92" value={value} onChange={(event) => setValue(Number(event.target.value))} />
        </div>
      </div>
    </section>
  );
}
