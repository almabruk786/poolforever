import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { getSiteContent } from "@/lib/cms";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const contact = await getSiteContent();

  return (
    <PageShell content={contact}>
      <main className="section-pad pt-36">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Contact" title={<>Start the conversation for your dream pool.</>} text="Call, message, or visit the Pool Forever team to begin your project." />
            <div className="grid gap-4 text-white/70">
              <p className="flex gap-3"><Phone className="text-aqua" /> {contact.phone}</p>
              <p className="flex gap-3"><Mail className="text-aqua" /> {contact.email}</p>
              <p className="flex gap-3"><MapPin className="text-aqua" /> {contact.address}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <iframe title="Google map placeholder" src={contact.mapEmbed} className="h-[28rem] w-full border-0" loading="lazy" />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
