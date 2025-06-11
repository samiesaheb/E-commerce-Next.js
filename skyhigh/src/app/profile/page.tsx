// src/app/profile/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/auth/signin'); // Redirects to sign in if not authenticated
  }

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-red-500">Your Profile</h1>

      <div className="space-y-2 text-center text-black">
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {session.user?.name || 'N/A'}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {session.user?.email || 'N/A'}
        </p>
      </div>

      <div className="mt-6 text-center">
        <form action="/api/auth/signout" method="post">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
