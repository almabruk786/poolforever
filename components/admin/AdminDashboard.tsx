"use client";

import {
  BarChart3,
  CalendarDays,
  Copy,
  FileVideo,
  Globe2,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  Waves
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { categories } from "@/lib/data";
import type { CmsAsset, CmsProject, SiteContent } from "@/types/cms";
import { Logo } from "../Logo";

type AdminDashboardProps = {
  initialContent: SiteContent;
  initialProjects: CmsProject[];
  initialUploads: CmsAsset[];
};

function formatSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminDashboard({ initialContent, initialProjects, initialUploads }: AdminDashboardProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const heroImageRef = useRef<HTMLInputElement>(null);
  const projectImageRef = useRef<HTMLInputElement>(null);
  const projectVideoRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(initialContent);
  const [projects, setProjects] = useState(initialProjects);
  const [uploads, setUploads] = useState(initialUploads);
  const [editingProject, setEditingProject] = useState<CmsProject | null>(null);
  const [message, setMessage] = useState("");

  const dashboardCards = [
    { title: "Projects", value: String(projects.length), icon: Waves, detail: "Portfolio items under admin control" },
    { title: "Uploads", value: String(uploads.length), icon: ImagePlus, detail: "Images and videos in media library" },
    { title: "Images", value: String(uploads.filter((asset) => asset.type.startsWith("image/")).length), icon: BarChart3, detail: "Uploaded picture assets" },
    { title: "Videos", value: String(uploads.filter((asset) => asset.type.startsWith("video/")).length), icon: FileVideo, detail: "Uploaded video assets" }
  ];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function saveContent(formData: FormData) {
    setMessage("Saving site content...");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    const data = await response.json();

    if (response.ok) {
      setContent(data.content);
      setMessage("Site content saved. Live pages updated.");
      router.refresh();
    } else {
      setMessage(data.message || "Could not save site content.");
    }
  }

  async function saveProject(formData: FormData) {
    setMessage(editingProject ? "Updating project..." : "Saving project...");
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    if (!payload.id) delete payload.id;

    const response = await fetch("/api/admin/projects", {
      method: payload.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (response.ok) {
      setProjects((current) => {
        const next = current.filter((project) => project.id !== data.project.id);
        return [data.project, ...next];
      });
      setEditingProject(null);
      setMessage(payload.id ? "Project updated." : "Project added.");
      router.refresh();
    } else {
      setMessage(data.message || "Could not save project.");
    }
  }

  async function deleteProject(id: string) {
    if (!window.confirm("Delete this project from the live gallery?")) return;

    setMessage("Deleting project...");
    const response = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await response.json();

    if (response.ok) {
      setProjects((current) => current.filter((project) => project.id !== id));
      if (editingProject?.id === id) setEditingProject(null);
      setMessage("Project deleted.");
      router.refresh();
    } else {
      setMessage(data.message || "Could not delete project.");
    }
  }

  async function uploadAsset(files: FileList | null) {
    if (!files?.length) return;

    setMessage("Uploading media...");
    const saved: CmsAsset[] = [];
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || `Could not upload ${file.name}.`);
        return;
      }
      saved.push(data.asset);
    }

    setUploads((current) => [...saved, ...current]);
    setMessage(saved.length === 1 ? "Upload saved." : `${saved.length} uploads saved.`);
  }

  async function deleteAsset(id: string) {
    if (!window.confirm("Delete this uploaded media item?")) return;

    setMessage("Deleting media...");
    const response = await fetch(`/api/admin/uploads?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await response.json();

    if (response.ok) {
      setUploads((current) => current.filter((asset) => asset.id !== id));
      setMessage("Media deleted.");
    } else {
      setMessage(data.message || "Could not delete media.");
    }
  }

  async function changePassword(formData: FormData) {
    setMessage("Updating password...");
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    const data = await response.json();
    setMessage(data.message);
  }

  function useAsset(asset: CmsAsset, target: "hero" | "image" | "video") {
    const ref = target === "hero" ? heroImageRef : target === "image" ? projectImageRef : projectVideoRef;
    if (ref.current) {
      ref.current.value = asset.src;
      setMessage(`${asset.name} placed in the ${target === "hero" ? "hero image" : target === "image" ? "project image" : "project video"} field.`);
    }
  }

  function editProject(project: CmsProject) {
    setEditingProject(project);
    window.location.hash = "projects";
  }

  return (
    <main className="min-h-screen bg-abyss text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-white/[.035] p-6 backdrop-blur-xl lg:block">
        <Logo />
        <nav className="mt-10 grid gap-2 text-white/65">
          {[
            ["Dashboard", LayoutDashboard],
            ["Content", Globe2],
            ["Projects", ImagePlus],
            ["Media", Upload],
            ["Settings", Settings]
          ].map(([label, Icon]) => (
            <a key={String(label)} href={`#${String(label).toLowerCase()}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/10 hover:text-white">
              <Icon size={18} /> {String(label)}
            </a>
          ))}
        </nav>
        <button onClick={logout} className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-white/70 hover:text-white">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <section className="px-4 py-6 lg:ml-72 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[.24em] text-aqua">POOL FOREVER CMS</p>
            <h1 className="font-display text-5xl">Admin Dashboard</h1>
          </div>
          <button onClick={logout} className="rounded-full bg-white px-5 py-2 font-semibold text-abyss lg:hidden">Logout</button>
        </div>

        <div id="dashboard" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map(({ title, value, icon: Icon, detail }) => (
            <div key={title} className="glass rounded-[2rem] p-6">
              <Icon className="text-aqua" />
              <p className="mt-8 font-display text-5xl">{value}</p>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-white/48">{detail}</p>
            </div>
          ))}
        </div>

        <form id="content" action={saveContent} className="glass mt-8 rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <Globe2 className="text-aqua" />
            <h2 className="font-display text-3xl">Site Content and Contact</h2>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            <input className="admin-input" name="heroEyebrow" placeholder="Hero eyebrow" defaultValue={content.heroEyebrow} />
            <input ref={heroImageRef} className="admin-input" name="heroImage" placeholder="Hero image URL" defaultValue={content.heroImage} />
            <input className="admin-input" name="heroTitle" placeholder="Hero title before highlighted text" defaultValue={content.heroTitle} />
            <input className="admin-input" name="heroAccent" placeholder="Highlighted hero text" defaultValue={content.heroAccent} />
            <textarea className="admin-input xl:col-span-2" name="heroDescription" placeholder="Hero description" rows={4} defaultValue={content.heroDescription} />
            <input className="admin-input" name="phone" placeholder="Phone number" defaultValue={content.phone} />
            <input className="admin-input" name="whatsapp" placeholder="WhatsApp number with country code" defaultValue={content.whatsapp} />
            <input className="admin-input" name="email" placeholder="Email address" defaultValue={content.email} />
            <input className="admin-input" name="facebook" placeholder="Facebook page URL" defaultValue={content.facebook} />
            <textarea className="admin-input" name="address" placeholder="Business address" rows={4} defaultValue={content.address} />
            <textarea className="admin-input" name="mapEmbed" placeholder="Google map embed URL" rows={4} defaultValue={content.mapEmbed} />
            <input className="admin-input" name="metaTitle" placeholder="SEO title" defaultValue={content.metaTitle} />
            <input className="admin-input" name="metaDescription" placeholder="SEO description" defaultValue={content.metaDescription} />
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-aqua px-5 py-3 font-semibold text-white">
            <Save size={18} /> Save Site Content
          </button>
        </form>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
          <form key={editingProject?.id || "new-project"} id="projects" action={saveProject} className="glass rounded-[2rem] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-3xl">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              {editingProject && (
                <button type="button" onClick={() => setEditingProject(null)} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white">
                  <Plus size={16} /> New Project
                </button>
              )}
            </div>
            <input type="hidden" name="id" defaultValue={editingProject?.id || ""} />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input className="admin-input" name="title" placeholder="Project title" defaultValue={editingProject?.title || ""} required />
              <select className="admin-input" name="category" defaultValue={editingProject?.category || categories[0]}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <input className="admin-input" name="location" placeholder="Location" defaultValue={editingProject?.location || ""} />
              <input ref={projectImageRef} className="admin-input" name="image" placeholder="Image URL or uploaded asset URL" defaultValue={editingProject?.image || ""} required />
              <input ref={projectVideoRef} className="admin-input md:col-span-2" name="video" placeholder="Optional video URL, embed URL, or uploaded asset URL" defaultValue={editingProject?.video || ""} />
              <textarea className="admin-input md:col-span-2" name="description" placeholder="Project description" rows={5} defaultValue={editingProject?.description || ""} />
            </div>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-aqua px-5 py-3 font-semibold text-white">
              <Save size={18} /> {editingProject ? "Update Project" : "Save Project"}
            </button>
          </form>

          <div id="media" className="glass rounded-[2rem] p-6">
            <h2 className="font-display text-3xl">Picture and Video Uploads</h2>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDrop={(event) => {
                event.preventDefault();
                uploadAsset(event.dataTransfer.files);
              }}
              onDragOver={(event) => event.preventDefault()}
              className="mt-5 grid min-h-52 w-full place-items-center rounded-[2rem] border border-dashed border-aqua/45 bg-aqua/5 text-center"
            >
              <span>
                <Upload className="mx-auto mb-4 text-aqua" />
                Drop images or videos here, or click to upload
              </span>
            </button>
            <input ref={fileRef} type="file" accept="image/*,video/*" multiple hidden onChange={(event) => uploadAsset(event.target.files)} />
            <div className="mt-5 grid gap-3">
              {uploads.slice(0, 6).map((asset) => (
                <div key={asset.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3">
                  <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/10">
                    {asset.type.startsWith("image/") ? <img src={asset.src} alt={asset.name} className="h-full w-full object-cover" /> : <FileVideo className="text-aqua" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{asset.name}</p>
                    <p className="text-xs text-white/45">{formatSize(asset.size)}</p>
                  </div>
                  {asset.type.startsWith("image/") && (
                    <>
                      <button type="button" onClick={() => useAsset(asset, "hero")} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 hover:text-white">
                        Hero
                      </button>
                      <button type="button" onClick={() => useAsset(asset, "image")} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 hover:text-white">
                        Image
                      </button>
                    </>
                  )}
                  {asset.type.startsWith("video/") && (
                    <button type="button" onClick={() => useAsset(asset, "video")} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 hover:text-white">
                      Video
                    </button>
                  )}
                  <button type="button" onClick={() => navigator.clipboard?.writeText(asset.src)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white" aria-label="Copy media URL">
                    <Copy size={15} />
                  </button>
                  <button type="button" onClick={() => deleteAsset(asset.id)} className="grid h-9 w-9 place-items-center rounded-full border border-red-400/25 text-red-200 hover:bg-red-500/20" aria-label="Delete media">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {!uploads.length && <p className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm text-white/55">No uploaded media yet.</p>}
            </div>
          </div>
        </div>

        <section className="glass mt-8 rounded-[2rem] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-3xl">Live Projects</h2>
            <p className="text-sm text-white/50">Edit or delete anything shown in the public project gallery.</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.045]">
                <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[.2em] text-aqua">{project.category}</p>
                  <h3 className="mt-2 font-display text-2xl">{project.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/55"><MapPin size={15} /> {project.location || "No location set"}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => editProject(project)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-abyss">
                      <Pencil size={15} /> Edit
                    </button>
                    <button type="button" onClick={() => deleteProject(project.id)} className="inline-flex items-center gap-2 rounded-full border border-red-400/25 px-4 py-2 text-sm text-red-100 hover:bg-red-500/20">
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div id="settings" className="mt-8 grid gap-6 xl:grid-cols-2">
          <form action={changePassword} className="glass rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-aqua" />
              <h2 className="font-display text-3xl">Security Settings</h2>
            </div>
            <div className="mt-5 grid gap-4">
              <input className="admin-input" name="currentPassword" type="password" placeholder="Current password" />
              <input className="admin-input" name="newPassword" type="password" placeholder="New password" />
              <button className="inline-flex w-fit items-center gap-2 rounded-full bg-aqua px-5 py-3 font-semibold text-white">
                <Save size={18} /> Change Password
              </button>
            </div>
          </form>

          <div className="glass rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <Phone className="text-aqua" />
              <h2 className="font-display text-3xl">Current Contact</h2>
            </div>
            <div className="mt-5 grid gap-3 text-white/62">
              <p className="flex gap-3"><Phone className="text-aqua" size={18} /> {content.phone}</p>
              <p className="flex gap-3"><Globe2 className="text-aqua" size={18} /> WhatsApp: {content.whatsapp}</p>
              <p className="flex gap-3"><MapPin className="text-aqua" size={18} /> {content.address}</p>
              <p className="flex gap-3"><CalendarDays className="text-aqua" size={18} /> Admin user: admin</p>
            </div>
          </div>
        </div>
        {message && <p className="fixed bottom-5 right-5 z-[90] rounded-full border border-white/10 bg-abyss/90 px-5 py-3 text-sm text-white shadow-glass backdrop-blur-xl">{message}</p>}
      </section>
    </main>
  );
}
