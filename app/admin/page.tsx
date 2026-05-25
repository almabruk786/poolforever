import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdminRequest } from "@/lib/auth";
import { getProjects, getSiteContent, getUploads } from "@/lib/cms";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminPage() {
  if (!(await isAdminRequest())) redirect("/admin/login");

  const [content, projects, uploads] = await Promise.all([getSiteContent(), getProjects(), getUploads()]);
  return <AdminDashboard initialContent={content} initialProjects={projects} initialUploads={uploads} />;
}
