import { NextResponse } from "next/server";
import { changeAdminPassword, isAdminRequest } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await request.json();
  const result = await changeAdminPassword(currentPassword, newPassword);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
