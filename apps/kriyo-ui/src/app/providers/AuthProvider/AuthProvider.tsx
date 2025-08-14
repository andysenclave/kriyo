'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User } from './models';
import { authClient } from '@/lib/authClient';

interface AuthContextType {
  isAuthPending: boolean;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthContextType = {
  isAuthPending: true,
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ isAuthPending, user, isLoading, isAuthenticated }, setState] =
    useState<AuthContextType>(initialState);
  const getSession = useCallback(async () => {
    const session = await authClient.getSession();

    if (!session || !session.data || !session.data.user) {
      setState({ isAuthPending: false, user: null, isLoading: false, isAuthenticated: false });
      return;
    }

    setState({
      isAuthPending: false,
      user: session.data.user as unknown as User,
      isLoading: false,
      isAuthenticated: true,
    });
  }, []);

  useEffect(() => {
    if (isAuthPending) {
      getSession();
    }
  }, [isAuthPending, getSession]);

  const value: AuthContextType = useMemo(
    () => ({
      isAuthPending,
      user,
      isLoading,
      isAuthenticated,
    }),
    [isAuthPending, user, isLoading, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
