// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // ✅ import the new Footer component

export const metadata: Metadata = {
  title: 'Sky High',
  description: 'Premium OEM Manufacturer of Cosmetics Since 2000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer /> {/* ✅ add Footer here */}
        </Providers>
      </body>
    </html>
  );
}
