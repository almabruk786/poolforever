import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/cms";
import type { SiteContent } from "@/types/cms";

export async function GET() {
  return NextResponse.json({ content: await getSiteContent() });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const payload = (await request.json()) as Partial<SiteContent>;
  const content = await saveSiteContent(payload);
  return NextResponse.json({ ok: true, content });
}
