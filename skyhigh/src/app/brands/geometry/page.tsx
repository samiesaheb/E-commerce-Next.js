'use client';

import Link from 'next/link';
import { geometryBrands } from '@/data/geometryBrands';
import { useCart } from '@/components/CartContext';

export default function GeometryPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Geometry Products</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {geometryBrands.map((brand) => (
            <div
              key={brand.slug}
              className="border p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <Link href={`/brands/geometry/${brand.slug}`} className="block">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{brand.name}</h2>
                <p className="text-gray-700 text-sm mb-2">{brand.description}</p>
                <p className="text-lg font-bold text-red-500 mb-4">${brand.price?.toFixed(2)}</p>
              </Link>

              <button
                onClick={() => handleAddToCart(brand)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
