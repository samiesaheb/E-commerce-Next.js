export type Brand = {
  slug: string;
  name: string;
  image: string;
  description: string;
  shortDescription?: string;
  price?: number; // ✅ New field
  id?: string;     // ✅ New field
};
