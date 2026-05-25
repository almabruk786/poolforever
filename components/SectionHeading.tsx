import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto mb-12 max-w-3xl text-center" : "mb-12 max-w-3xl"}>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[.28em] text-aqua">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-white/68">{text}</p>}
    </div>
  );
}
