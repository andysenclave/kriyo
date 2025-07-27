'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useAuth } from '@/lib/auth-context';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kriyo</h1>
          <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-gray-300 hover:bg-gray-50"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
