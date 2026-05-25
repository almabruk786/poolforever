import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { deleteProject, getProjects, saveProject } from "@/lib/cms";
import type { ProjectInput } from "@/types/cms";

export async function GET() {
  return NextResponse.json({ projects: await getProjects() });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as ProjectInput;
  if (!body.title || !body.image) {
    return NextResponse.json({ message: "Project title and image are required." }, { status: 400 });
  }

  const project = await saveProject(body);
  return NextResponse.json({ ok: true, project });
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as ProjectInput;
  if (!body.id) return NextResponse.json({ message: "Project id is required." }, { status: 400 });
  if (!body.title || !body.image) {
    return NextResponse.json({ message: "Project title and image are required." }, { status: 400 });
  }

  const project = await saveProject(body);
  return NextResponse.json({ ok: true, project });
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Project id is required." }, { status: 400 });

  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
