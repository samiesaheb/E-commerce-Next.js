export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Product Categories</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Facial Care</h2>
            <p>From brightening foams to anti-aging serums, our facial care line enhances and protects all skin types.</p>
          </div>
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Hair Care</h2>
            <p>Nourishing shampoos, conditioners, and treatments designed to strengthen and restore hair health.</p>
          </div>
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Body & Skin Care</h2>
            <p>Hydrating lotions, scrubs, and body washes crafted to keep your skin soft, smooth, and revitalized.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
