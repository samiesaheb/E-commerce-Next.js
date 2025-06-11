'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { allProductBrands } from '@/data/allBrands'; // Ensure this data includes 'image' and 'shortDescription'

// Assuming your 'Brand' type now includes 'image' and 'shortDescription'
// as per previous steps in src/types/brand.ts
// For example:
// interface Brand {
//   slug: string;
//   name: string;
//   image?: string; // Optional image property
//   description: string;
//   shortDescription?: string; // Optional short description property
//   category: string;
// }


const categoryLinks = [
  {
    name: 'Hair Care',
    description: 'Shampoos, conditioners, serums & treatments',
    href: '/brands/hairCare',
  },
  {
    name: 'Facial Care',
    description: 'Cleansers, serums, creams & acne solutions',
    href: '/brands/facialCare',
  },
  {
    name: 'Body & Skin Care',
    description: 'Soaps, lotions, therapeutic & baby care',
    href: '/brands/bodyCare',
  },
];

export default function BrandsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';

  const matchedProducts = allProductBrands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(query) ||
      brand.category.toLowerCase().includes(query) ||
      (brand.description && brand.description.toLowerCase().includes(query)) || // Also search in full description
      (brand.shortDescription && brand.shortDescription.toLowerCase().includes(query)) // Also search in short description
  );

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <section className="max-w-5xl mx-auto">
        {/* Conditional rendering for the main heading */}
        {query ? (
          <h1 className="text-4xl text-center mb-10 font-bold"> {/* Added font-bold for consistency */}
            Results for "{query}"
          </h1>
        ) : (
          <h1 className="text-4xl font-bold text-center mb-10">Our Brands</h1>
        )}

        {query ? ( // This block executes when a search query is present
          matchedProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {matchedProducts.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.category}/${brand.slug}`} // Ensure category is part of your brand data
                  className="block border p-6 rounded-lg shadow hover:shadow-md transition hover:bg-pink-50"
                >
                  {/* === ADDED THIS BLOCK FOR IMAGE DISPLAY === */}
                  {brand.image && (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-48 object-cover rounded mb-4" // Tailwind classes for image styling
                    />
                  )}
                  {/* === END ADDED BLOCK === */}
                  <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                  <p className="text-sm text-gray-600">
                    {/* Display shortDescription if available, else full description */}
                    {brand.shortDescription || brand.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No products found for "{query}"
            </p>
          )
        ) : ( // This block executes when NO search query is present (default Brands page view)
          <>
            {/* Our Brands - only shown when no query */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
              <Link
                href="/brands/geometry"
                className="block border p-6 rounded-lg shadow hover:shadow-md transition hover:bg-pink-50"
              >
                {/* Consider adding images here too for consistency, if desired */}
                <h3 className="text-xl font-semibold mb-2">Geometry</h3>
                <p className="text-sm text-gray-600">
                  Science-backed personal care – facial foam, hair serum, sunscreen & more.
                </p>
              </Link>

              <Link
                href="/brands/iffa"
                className="block border p-6 rounded-lg shadow hover:shadow-md transition hover:bg-pink-50"
              >
                {/* Consider adding images here too for consistency, if desired */}
                <h3 className="text-xl font-semibold mb-2">Iffa</h3>
                <p className="text-sm text-gray-600">
                  Premium skincare brand that blends nature and innovation.
                </p>
              </Link>
            </div>

            {/* Other Brands - only shown when no query */}
            <h2 className="text-3xl font-bold text-center mb-10 mt-20">Other Brands</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryLinks.map((brand) => (
                <Link
                  key={brand.name}
                  href={brand.href}
                  className="block border p-6 rounded-lg shadow hover:shadow-md transition hover:bg-pink-50"
                >
                  {/* If you have images for categories, you can add them here */}
                  <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.description}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}