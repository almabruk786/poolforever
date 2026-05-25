import { promises as fs } from "fs";
import path from "path";
import { ObjectId, type Document } from "mongodb";
import { getCollection } from "./db";
import { contact, heroSlides, projects as defaultProjects } from "./data";
import type { CmsAsset, CmsProject, ProjectInput, SiteContent } from "@/types/cms";

type CmsStore = {
  content?: Partial<SiteContent>;
  projects?: CmsProject[];
  uploads?: CmsAsset[];
};

const storePath = path.join(process.cwd(), "data", "cms.json");

export const defaultSiteContent: SiteContent = {
  heroEyebrow: "Luxury Resort Standard Pool Company",
  heroTitle: "Build Your Dream Pool With",
  heroAccent: "Pool Forever",
  heroDescription:
    "Premium swimming pool design, construction, renovation, Jacuzzi, fountain, and maintenance experiences crafted for villas, rooftops, resorts, and signature properties.",
  heroImage: heroSlides[0]?.image || "/gallery/hero-pool.svg",
  phone: contact.phone,
  whatsapp: contact.whatsapp,
  facebook: contact.facebook,
  email: contact.email,
  address: contact.address,
  mapEmbed: contact.mapEmbed,
  metaTitle: "POOL FOREVER | Luxury Swimming Pool Design and Construction",
  metaDescription:
    "Premium swimming pool design, construction, renovation, Jacuzzi, fountain, resort pool, rooftop pool, and maintenance services."
};

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item"
  );
}

function makeId(label: string) {
  return `${slugify(label)}-${Date.now().toString(36)}`;
}

function idFilter(id: string) {
  if (ObjectId.isValid(id)) {
    return { $or: [{ id }, { _id: new ObjectId(id) }] };
  }

  return { id };
}

async function readStore(): Promise<CmsStore> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return JSON.parse(raw) as CmsStore;
  } catch {
    return {};
  }
}

async function writeStore(store: CmsStore) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function documentId(document: { id?: unknown; _id?: unknown }, fallback: string) {
  return stringValue(document.id) || (document._id ? String(document._id) : fallback);
}

function normalizeProject(project: Partial<CmsProject> & Partial<ProjectInput> & { _id?: unknown }): CmsProject {
  return {
    id: documentId(project, makeId(stringValue(project.title, "project"))),
    title: stringValue(project.title, "Untitled Project"),
    category: stringValue(project.category, "Luxury Pools"),
    location: stringValue(project.location),
    image: stringValue(project.image, "/gallery/hero-pool.svg"),
    video: stringValue(project.video) || undefined,
    description: stringValue(project.description),
    createdAt: stringValue(project.createdAt) || undefined,
    updatedAt: stringValue(project.updatedAt) || undefined
  };
}

function normalizeAsset(asset: Partial<CmsAsset> & { _id?: unknown }): CmsAsset {
  return {
    id: documentId(asset, makeId(stringValue(asset.name, "asset"))),
    name: stringValue(asset.name, "Uploaded asset"),
    type: stringValue(asset.type, "application/octet-stream"),
    size: typeof asset.size === "number" ? asset.size : 0,
    src: stringValue(asset.src),
    createdAt: stringValue(asset.createdAt) || new Date().toISOString()
  };
}

function cleanContent(input: Partial<SiteContent>) {
  const merged = { ...defaultSiteContent, ...input };
  return Object.fromEntries(
    Object.entries(merged).map(([key, value]) => [key, stringValue(value, defaultSiteContent[key as keyof SiteContent])])
  ) as SiteContent;
}

export async function getSiteContent() {
  try {
    const collection = await getCollection<Document>("content");
    if (collection) {
      const stored = await collection.findOne({ key: "site" });
      return cleanContent((stored || {}) as Partial<SiteContent>);
    }

    const store = await readStore();
    return cleanContent(store.content || {});
  } catch {
    return cleanContent({});
  }
}

export async function saveSiteContent(input: Partial<SiteContent>) {
  const content = cleanContent(input);
  const collection = await getCollection<Document>("content");

  if (collection) {
    await collection.updateOne(
      { key: "site" },
      { $set: { ...content, key: "site", updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
    return content;
  }

  const store = await readStore();
  store.content = content;
  await writeStore(store);
  return content;
}

export async function getProjects() {
  try {
    const collection = await getCollection<Document>("projects");
    if (collection) {
      const stored = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return (stored.length ? stored : defaultProjects).map(normalizeProject);
    }

    const store = await readStore();
    if (store.projects) return store.projects.map(normalizeProject);
    return defaultProjects.map(normalizeProject);
  } catch {
    return defaultProjects.map(normalizeProject);
  }
}

export async function saveProject(input: ProjectInput) {
  const now = new Date().toISOString();
  const project = normalizeProject({
    ...input,
    id: stringValue(input.id) || makeId(input.title),
    createdAt: now,
    updatedAt: now
  });

  const collection = await getCollection<Document>("projects");
  if (collection) {
    await collection.updateOne(idFilter(project.id), { $set: project }, { upsert: true });
    return project;
  }

  const store = await readStore();
  const projects = store.projects || defaultProjects.map(normalizeProject);
  const index = projects.findIndex((item) => item.id === project.id);
  if (index >= 0) {
    project.createdAt = projects[index].createdAt || project.createdAt;
    projects[index] = project;
  } else {
    projects.unshift(project);
  }

  store.projects = projects;
  await writeStore(store);
  return project;
}

export async function deleteProject(id: string) {
  const collection = await getCollection<Document>("projects");
  if (collection) {
    const result = await collection.deleteOne(idFilter(id));
    return result.deletedCount > 0;
  }

  const store = await readStore();
  const projects = store.projects || defaultProjects.map(normalizeProject);
  const nextProjects = projects.filter((project) => project.id !== id);
  store.projects = nextProjects;
  await writeStore(store);
  return nextProjects.length !== projects.length;
}

export async function getUploads() {
  const collection = await getCollection<Document>("uploads");
  if (collection) {
    const uploads = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return uploads.map(normalizeAsset);
  }

  const store = await readStore();
  return (store.uploads || []).map(normalizeAsset);
}

export async function saveAsset(input: Omit<CmsAsset, "id" | "createdAt">) {
  const asset = normalizeAsset({
    ...input,
    id: makeId(input.name),
    createdAt: new Date().toISOString()
  });

  const collection = await getCollection<Document>("uploads");
  if (collection) {
    await collection.insertOne(asset);
    return asset;
  }

  const store = await readStore();
  store.uploads = [asset, ...(store.uploads || [])];
  await writeStore(store);
  return asset;
}

export async function deleteAsset(id: string) {
  const collection = await getCollection<Document>("uploads");
  if (collection) {
    const result = await collection.deleteOne(idFilter(id));
    return result.deletedCount > 0;
  }

  const store = await readStore();
  const uploads = store.uploads || [];
  const nextUploads = uploads.filter((asset) => asset.id !== id);
  store.uploads = nextUploads;
  await writeStore(store);
  return nextUploads.length !== uploads.length;
}
