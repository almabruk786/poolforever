import { NextResponse } from "next/server";
import { setAdminCookie, signAdminToken, verifyAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const valid = await verifyAdminCredentials(username, password);
  if (!valid) {
    return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
  }

  await setAdminCookie(signAdminToken(username));
  return NextResponse.json({ ok: true });
}
