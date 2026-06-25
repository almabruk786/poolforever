"use client";

import { CalendarCheck, Send } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/data";

export function BookingForm() {
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    setStatus("Sending...");
    try {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        let data = null;
        try {
          data = await response.json();
        } catch {}
        setStatus("Booking received. Opening WhatsApp notification...");
        if (data?.whatsapp) {
          window.open(data.whatsapp, "_blank");
        }
      } else {
        let errorMessage = "Something went wrong.";
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch {
          errorMessage = `Something went wrong (Status: ${response.status}).`;
        }
        setStatus(errorMessage);
      }
    } catch (err) {
      setStatus("Network error occurred. Please try again.");
    }
  }

  return (
    <form action={submit} className="glass rounded-[2rem] p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <CalendarCheck className="text-aqua" />
        <h2 className="font-display text-3xl">Book a Pool Consultation</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="admin-input" name="name" placeholder="Customer name" required />
        <input className="admin-input" name="phone" placeholder="Phone / WhatsApp" required />
        <input className="admin-input" name="email" type="email" placeholder="Email address" />
        <input className="admin-input" name="preferredDate" type="date" required />
        <select className="admin-input" name="poolType" defaultValue="Luxury Pools">
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <input className="admin-input" name="message" placeholder="Project location / budget / notes" />
      </div>
      <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 font-semibold text-white shadow-glow">
        Send Booking <Send size={18} />
      </button>
      {status && <p className="mt-4 text-sm text-white/65">{status}</p>}
    </form>
  );
}
