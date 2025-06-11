'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import SearchBarWithAutocomplete from './SearchBarWithAutocomplete';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';
import { ShoppingCart } from 'lucide-react';


export default function Header() {
  const { data: session, status } = useSession();
  const [hasMounted, setHasMounted] = useState(false);
  const { cartCount } = useCart(); // ✅ Get cart count

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm px-6 py-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Auth Links + Cart Icon - Top Right */}
        {hasMounted && (
          <div className="absolute top-6 right-6 flex space-x-6 items-center">
            <Link href="/cart" className="relative text-black hover:text-red-600">
              <ShoppingCart className="w-6 h-6" /> {/* Lucide professional cart icon */}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                  {cartCount}
                </span>
              )}
            </Link>


            {status === 'authenticated' ? (
              <>
                <Link href="/profile" className="text-black hover:text-red-600">Profile</Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-black hover:text-red-600"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="text-black hover:text-red-600">Login</Link>
            )}
          </div>
        )}

        {/* Centered Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-3xl font-bold text-red-500 cursor-pointer">Sky High</h1>
          </Link>

          {/* Nav Links */}
          <nav className="flex space-x-6">
            <Link href="/about" className="text-black hover:text-red-600">About</Link>

            <div className="relative group inline-block">
              <Link href="/brands" className="text-black hover:text-pink-600 inline-block">Brands</Link>
              <div className="absolute left-1/2 -translate-x-1/2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <Link href="/brands/geometry" className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50">Geometry</Link>
                <Link href="/brands/hairCare" className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50">Hair Care</Link>
                <Link href="/brands/facialCare" className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50">Facial Care</Link>
                <Link href="/brands/bodyCare" className="block px-4 py-2 text-sm text-gray-800 hover:bg-pink-50">Body & Skin Care</Link>
              </div>
            </div>

            <Link href="/contact" className="text-black hover:text-red-600">Contact</Link>
          </nav>

          {/* Search Bar */}
          <div className="w-full max-w-md">
            <SearchBarWithAutocomplete />
          </div>
        </div>
      </div>
    </header>
  );
}
