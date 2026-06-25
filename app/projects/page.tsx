import { GalleryExperience } from "@/components/GalleryExperience";
import { PageShell } from "@/components/PageShell";
import { getProjects, getSiteContent } from "@/lib/cms";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);

  return (
    <PageShell content={content}>
      <main className="pt-24">
        <GalleryExperience projects={projects} />
      </main>
    </PageShell>
  );
}
