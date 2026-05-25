import { BeforeAfter } from "@/components/BeforeAfter";
import { GalleryExperience } from "@/components/GalleryExperience";
import { Hero } from "@/components/Hero";
import { PageShell } from "@/components/PageShell";
import { ProjectSlider } from "@/components/ProjectSlider";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { getProjects, getSiteContent } from "@/lib/cms";

export default async function HomePage() {
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);

  return (
    <PageShell splash content={content}>
      <Hero content={content} />
      <Stats />
      <ServicesGrid />
      <ProjectSlider projects={projects} />
      <BeforeAfter />
      <GalleryExperience projects={projects} />
      <Testimonials />
    </PageShell>
  );
}
