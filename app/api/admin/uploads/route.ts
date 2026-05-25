import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { deleteAsset, getUploads, saveAsset } from "@/lib/cms";

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ uploads: await getUploads() });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "No file received." }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const src = `data:${file.type};base64,${bytes.toString("base64")}`;
  const asset = await saveAsset({ name: file.name, type: file.type, size: file.size, src });

  return NextResponse.json({ ok: true, asset });
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Asset id is required." }, { status: 400 });

  await deleteAsset(id);
  return NextResponse.json({ ok: true });
}
