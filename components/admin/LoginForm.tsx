"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "../Logo";

export function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function login(formData: FormData) {
    setMessage("Checking credentials...");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        let errorMessage = "Login failed.";
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch {
          errorMessage = `Login failed (Status: ${response.status})`;
        }
        setMessage(errorMessage);
      }
    } catch (err) {
      setMessage("Network error occurred. Please try again.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form action={login} className="glass w-full max-w-md rounded-[2rem] p-8">
        <Logo />
        <div className="mt-10 flex items-center gap-3">
          <Lock className="text-aqua" />
          <h1 className="font-display text-4xl">Admin Login</h1>
        </div>
        <div className="mt-6 grid gap-4">
          <input className="admin-input" name="username" placeholder="Username" defaultValue="admin" />
          <input className="admin-input" name="password" type="password" placeholder="Password" defaultValue="Miraj@2026" />
        </div>
        <button className="mt-6 w-full rounded-full bg-aqua px-6 py-3 font-semibold text-white shadow-glow">Enter Dashboard</button>
        {message && <p className="mt-4 text-sm text-white/65">{message}</p>}
      </form>
    </main>
  );
}
