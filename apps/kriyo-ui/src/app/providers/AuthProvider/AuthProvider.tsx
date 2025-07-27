'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from './models';
import AuthClient, { getSession } from './AuthClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshAuth = () => {
    const currentUser = AuthClient.getCurrentUser();
    const isAuth = AuthClient.isAuthenticated();

    setUser(currentUser);
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  };

  useEffect(() => {
    // Initial auth check
    refreshAuth();

    // Listen for auth changes (e.g., when user signs in/out)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kriyo_auth_token' || e.key === 'kriyo_user') {
        refreshAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const useSession = () => {
  const session = getSession();

  return {
    data: session,
    isPending: false,
  };
};
