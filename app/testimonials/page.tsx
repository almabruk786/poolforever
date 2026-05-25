import { PageShell } from "@/components/PageShell";
import { Testimonials } from "@/components/Testimonials";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <PageShell>
      <main className="pt-24">
        <Testimonials />
      </main>
    </PageShell>
  );
}
