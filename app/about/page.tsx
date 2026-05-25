import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell>
      <main className="section-pad pt-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="About Pool Forever" title={<>A premium pool company built around beauty, engineering, and trust.</>} text="POOL FOREVER creates luxury swimming pools and water features for homes, rooftops, resorts, wellness spaces, and signature properties." />
          <div className="grid gap-5 md:grid-cols-3">
            {["Design Led", "Engineering Strong", "Aftercare Ready"].map((item) => (
              <div key={item} className="glass rounded-[2rem] p-7">
                <h2 className="font-display text-3xl">{item}</h2>
                <p className="mt-4 text-white/65">International-standard planning, premium materials, and a smooth client journey from consultation to maintenance.</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
