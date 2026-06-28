import { NextResponse } from "next/server";
import { getSiteContent, saveBooking } from "@/lib/cms";
import type { BookingInput } from "@/types/cms";

export async function POST(request: Request) {
  const body = (await request.json()) as BookingInput;
  if (!body.name || !body.phone || !body.preferredDate) {
    return NextResponse.json({ message: "Name, phone, and date are required." }, { status: 400 });
  }

  const booking = { ...body, status: "new", createdAt: new Date().toISOString() };
  await saveBooking(booking);

  const content = await getSiteContent();
  const whatsapp = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(
    `New Pool Forever booking request\nName: ${body.name}\nPhone: ${body.phone}\nDate: ${body.preferredDate}\nType: ${body.poolType}`
  )}`;

  return NextResponse.json({
    ok: true,
    booking,
    whatsapp,
    emailQueued: Boolean(process.env.NOTIFICATION_EMAIL_TO)
  });
}
