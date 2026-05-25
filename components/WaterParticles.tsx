"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function WaterParticles() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const dots = Array.from(root.querySelectorAll("span"));
    const ctx = gsap.context(() => {
      dots.forEach((dot, index) => {
        gsap.to(dot, {
          x: `${index % 2 ? "-" : ""}${24 + index * 3}`,
          y: -38 - index * 5,
          opacity: 0.05 + (index % 4) * 0.05,
          duration: 4 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.18
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-aqua/50 blur-[1px]"
          style={{
            left: `${8 + ((index * 17) % 86)}%`,
            top: `${18 + ((index * 23) % 70)}%`
          }}
        />
      ))}
    </div>
  );
}
