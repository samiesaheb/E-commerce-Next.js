import { Brand } from '@/types/brand'; // adjust if needed

export function getBrandBySlug(slug: string, data: Brand[]): Brand | undefined {
  return data.find((item) => item.slug === slug);
}
