'use client';

import { geometryBrands } from '@/data/geometryBrands';
import { getBrandBySlug } from '@/data/utils';
import { notFound } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { CartItem } from '@/types/cart';

export default function GeometryBrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug, geometryBrands);
  const { addToCart } = useCart();

  if (!brand || brand.price === undefined) return notFound(); // ✅ Explicitly guard against undefined

  const handleAddToCart = () => {
    const item: CartItem = {
      ...brand,
      price: brand.price as number, // ✅ Assert it's a number (we already checked above)
      quantity: 1,
    };
    addToCart(item);
  };

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
        <p className="text-xl font-semibold text-red-600">${brand.price.toFixed(2)}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
