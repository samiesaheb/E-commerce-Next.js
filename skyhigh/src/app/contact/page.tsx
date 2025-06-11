export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <section className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        <p className="text-center mb-8">
          We'd love to hear from you. Fill out the form below or reach out via the contact details provided.
        </p>

        <form
          action="https://formspree.io/f/xrbkpraj"
          method="POST"
          className="space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded px-4 py-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded px-4 py-3"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full border border-gray-300 rounded px-4 py-3"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 text-center text-sm">
          <p><strong>Sky High International Co., Ltd.</strong></p>
          <p>524 Moo 7, Bangpoo Mai, Muang, Samutprakarn 10280, Thailand</p>
          <p>Tel: (662) 3233517 - 20 | Fax: (662) 23233516</p>
          <p>Email: samie@skyhigh.co.th</p>
        </div>

        {/* Embedded Google Map */}
        <div className="mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.003249215984!2d100.6294910752549!3d13.53539188683428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d59ceaaaaaaab%3A0xf32601aaee792057!2sSky%20High%20International%20Co.%2CLtd.!5e0!3m2!1sen!2sin!4v1749541113936!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
