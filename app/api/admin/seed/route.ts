import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { projects as defaultProjects } from "@/lib/data";
import { saveProject } from "@/lib/cms";

// One-time seed endpoint — protected by a secret token
// Call via: GET /api/admin/seed?token=poolforever-seed-2026
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== "poolforever-seed-2026") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Clear existing projects from MongoDB
    const collection = await getCollection("projects");
    if (collection) {
      await collection.deleteMany({});
    }

    // Insert all real projects from data.ts
    const saved = [];
    for (const project of defaultProjects) {
      const result = await saveProject(project);
      saved.push(result.title);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${saved.length} real projects into MongoDB.`,
      projects: saved
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 }
    );
  }
}
