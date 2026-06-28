"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Play, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { categories } from "@/lib/data";
import type { CmsProject } from "@/types/cms";
import { SectionHeading } from "./SectionHeading";
import { getOptimizedUrl } from "@/lib/cloudinary-loader";

export function GalleryExperience({ projects }: { projects: CmsProject[] }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<CmsProject | null>(null);
  const filtered = useMemo(() => (category === "All" ? projects : projects.filter((project) => project.category === category)), [category]);
  const activeVideo = active?.video || "";
  const isEmbedVideo = /youtube|youtu\.be|vimeo|player/i.test(activeVideo);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Gallery" title={<>Filter, preview, and explore every pool style.</>} text="A touch-friendly masonry gallery with fullscreen preview support and video-ready project cards." />
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {["All", ...categories].map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-5 py-2 text-sm transition ${category === item ? "border-aqua bg-aqua text-white" : "border-white/12 bg-white/5 text-white/70 hover:text-white"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {filtered.map((project, index) => (
            <motion.button
              key={project.id}
              layout
              onClick={() => setActive(project)}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.055] text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full overflow-hidden">
                <img
                  src={getOptimizedUrl(project.image, 600)}
                  alt={project.title}
                  className="w-full h-auto transition duration-700 group-hover:scale-110 object-contain block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent" />
                {project.video && <Play className="absolute left-5 top-5 text-aqua" />}
                <Maximize2 className="absolute right-5 top-5 opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-0 p-5">
                  <p className="text-xs uppercase tracking-[.22em] text-aqua">{project.category}</p>
                  <h3 className="mt-2 font-display text-3xl">{project.title}</h3>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        {!filtered.length && <p className="rounded-2xl border border-white/10 bg-white/[.04] p-6 text-white/60">No projects in this category yet.</p>}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close preview" onClick={() => setActive(null)} className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-abyss">
              <X />
            </button>
            <motion.div layoutId={active.id} className="max-h-[95vh] w-full max-w-[95vw] sm:max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-abyss flex flex-col justify-between">
              {active.video ? (
                isEmbedVideo ? (
                  <iframe title={active.title} src={active.video} className="h-[75vh] w-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                ) : (
                  <video src={active.video} poster={getOptimizedUrl(active.image, 1200)} className="max-h-[75vh] w-full bg-black object-contain" controls />
                )
              ) : active.images && active.images.length > 1 ? (
                <div className="relative h-[55vh] sm:h-[65vh] md:h-[72vh] w-full bg-black/40">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: true }}
                    loop
                    className="h-full w-full [--swiper-navigation-color:#13c8f2] [--swiper-pagination-color:#13c8f2]"
                  >
                    {active.images.map((imgSrc, imgIndex) => (
                      <SwiperSlide key={imgSrc} className="flex items-center justify-center w-full h-full">
                        <img
                          src={getOptimizedUrl(imgSrc, 1200)}
                          alt={`${active.title} - view ${imgIndex + 1}`}
                          className="max-h-[72vh] max-w-full w-auto h-auto object-contain mx-auto block"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full bg-black/20 p-2 h-[55vh] sm:h-[65vh] md:h-[72vh]">
                  <img
                    src={getOptimizedUrl(active.image, 1200)}
                    alt={active.title}
                    className="max-h-[72vh] max-w-full w-auto h-auto object-contain mx-auto block"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-aqua">{active.category}</p>
                <h3 className="font-display text-4xl">{active.title}</h3>
                <p className="mt-3 max-w-3xl text-white/68">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
