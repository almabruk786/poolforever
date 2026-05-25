import { PageShell } from "@/components/PageShell";
import { ServicesGrid } from "@/components/ServicesGrid";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <PageShell>
      <main className="pt-24">
        <ServicesGrid />
      </main>
    </PageShell>
  );
}
