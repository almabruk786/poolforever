import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { deleteAsset, getUploads, saveAsset } from "@/lib/cms";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ uploads: await getUploads() });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ message: "No file received." }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const src = `data:${file.type};base64,${bytes.toString("base64")}`;

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(src, {
      folder: "pool-forever",
      resource_type: "auto"
    });

    const asset = await saveAsset({
      name: file.name,
      type: file.type,
      size: file.size,
      src: uploadResult.secure_url,
      publicId: uploadResult.public_id
    });

    return NextResponse.json({ ok: true, asset });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ message: "Failed to upload file to Cloudinary." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ message: "Asset id is required." }, { status: 400 });

    // Retrieve asset to check if it has a publicId
    const uploads = await getUploads();
    const asset = uploads.find((item) => item.id === id);

    if (asset && asset.publicId) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(asset.publicId, {
        resource_type: asset.type.startsWith("video/") ? "video" : "image"
      });
    }

    await deleteAsset(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json({ message: "Failed to delete file from Cloudinary." }, { status: 500 });
  }
}
