// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-red-500">Dashboard</h1>

      <p className="text-lg text-center text-black">
        Welcome, <span className="font-semibold">{session.user?.name || session.user?.email}</span>!
      </p>

      {/* You can add dashboard widgets/components here */}
    </div>
  );
}
