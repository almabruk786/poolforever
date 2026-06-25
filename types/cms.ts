export type ProjectCategory =
  | "Rooftop Pools"
  | "Indoor Pools"
  | "Kids Pools"
  | "Luxury Pools"
  | "Resort Pools"
  | "Jacuzzi"
  | "Fountain Design";

export type ProjectInput = {
  id?: string;
  title: string;
  category: ProjectCategory | string;
  location: string;
  image: string;
  images?: string[];
  video?: string;
  description: string;
};

export type CmsProject = Required<Pick<ProjectInput, "title" | "category" | "location" | "image" | "description">> & {
  id: string;
  images?: string[];
  video?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SiteContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  heroImage: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  email: string;
  address: string;
  mapEmbed: string;
  metaTitle: string;
  metaDescription: string;
};

export type CmsAsset = {
  id: string;
  name: string;
  type: string;
  size: number;
  src: string;
  createdAt: string;
};

export type BookingInput = {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  poolType: string;
  message: string;
};
