import { BookingForm } from "@/components/BookingForm";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = { title: "Booking" };

export default function BookingPage() {
  return (
    <PageShell>
      <main className="section-pad pt-36">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <SectionHeading eyebrow="Booking" title={<>Reserve a premium pool consultation.</>} text="Choose a date, share your details, and the team can follow up through WhatsApp or email." />
          <BookingForm />
        </div>
      </main>
    </PageShell>
  );
}
