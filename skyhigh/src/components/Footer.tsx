// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-6 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="mb-2 md:mb-0">
          Follow Us:{' '}
          <a
            href="https://www.instagram.com/skyhigh.inter/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            Instagram
          </a>
        </p>
        <p className="text-right">
          © {new Date().getFullYear()} Sky High International Co., Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
