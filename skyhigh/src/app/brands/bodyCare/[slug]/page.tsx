// src/app/brands/bodyCare/[slug]/page.tsx
import { bodyCareBrands } from '@/data/bodyCareBrands';
import { getBrandBySlug } from '@/data/utils';
import { notFound } from 'next/navigation';

export default function BodyCareBrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug, bodyCareBrands);
  if (!brand) return notFound();

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <img
            src={brand.image}
            alt={brand.name}
            className="max-w-full h-auto rounded shadow"
          />
        </div>
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="text-gray-700 text-base leading-relaxed">{brand.description}</p>
      </div>
    </main>
  );
}