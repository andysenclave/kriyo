'use client';
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';

interface LogoutData {
  logout: () => Promise<void>;
}

const useLogout = (): LogoutData => {
  const router = useRouter();

  const logout = async () => {
    try {
      const { data, error } = await authClient.signOut();

      console.log('Logout response:', { data, error });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if signOut fails, redirect to login
      router.push('/auth/login');
    }
  };

  return {
    logout,
  };
};

export default useLogout;
