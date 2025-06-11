import Link from 'next/link';
import { facialCareBrands } from '@/data/facialCareBrands';

export default function FacialCarePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Facial Care Products</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {facialCareBrands.map((brand) => (
            <Link
              href={`/brands/facialCare/${brand.slug}`}
              key={brand.slug}
              className="block border p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{brand.name}</h2>
              <p className="text-gray-700 text-sm">{brand.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
