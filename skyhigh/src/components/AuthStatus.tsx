'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (status === 'authenticated' && session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="text-sm text-black hover:text-red-600">
          Profile
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/auth/signin" className="text-sm text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded">
      Login
    </Link>
  );
}
