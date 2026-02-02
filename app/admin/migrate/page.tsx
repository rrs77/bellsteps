import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { MigrateButton } from './MigrateButton';

export default async function AdminMigratePage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map((e) => e.trim()) || [];
  const isAdmin = session.user?.email && adminEmails.includes(session.user.email);

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-100 border-4 border-red-500 rounded-xl p-6">
          <h1 className="text-2xl font-bold text-red-900 mb-2">Access Denied</h1>
          <p className="text-red-700">You don't have permission to access this page.</p>
          <p className="text-red-600 text-sm mt-2">Add your email to ADMIN_EMAILS environment variable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Run Database Migrations</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <p className="text-gray-700 mb-6">
          This will create all necessary database tables. This is safe to run multiple times.
        </p>

        <MigrateButton />
      </div>
    </div>
  );
}
