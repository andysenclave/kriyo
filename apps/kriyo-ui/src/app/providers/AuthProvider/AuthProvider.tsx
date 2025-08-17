'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Auth, LoginPayload, SignupPayload, User } from './models';
import { authClient } from '@/lib/authClient';
import config from '@/services/api/config';

interface AuthState {
  isAuthPending: boolean;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (loginPayload: LoginPayload) => Promise<Auth | null>;

  logout: () => Promise<void>;
  signup: (signupPayload: SignupPayload) => Promise<Auth | null>;
}

const initialState: AuthState = {
  isAuthPending: true,
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ isAuthPending, user, isLoading, isAuthenticated }, setState] =
    useState<AuthState>(initialState);

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

  const login = useCallback(async (credentials: LoginPayload) => {
    try {
      const { data } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
        callbackURL: `${config.appBaseUrl}/dashboard`,
      });

      if (!data) {
        setState({ isAuthPending: true, user: null, isLoading: false, isAuthenticated: false });
        throw new Error('Login failed, no data returned');
      }

      return data as unknown as Auth;
    } catch (error) {
      console.error('Log in error:', error);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authClient.signOut();
      setState({ isAuthPending: true, user: null, isLoading: false, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      setState({ isAuthPending: true, user: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  const signup = useCallback(async (userData: SignupPayload): Promise<Auth | null> => {
    try {
      const { data } = await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        // @ts-expect-error by default phone is not included
        phone: userData.phone,
        callbackURL: `${config.appBaseUrl}/dashboard`,
      });

      if (!data) {
        setState({ isAuthPending: true, user: null, isLoading: false, isAuthenticated: false });
        throw new Error('Signup failed, no data returned');
      }

      setState({
        isAuthPending: false,
        user: data?.user as unknown as User,
        isLoading: false,
        isAuthenticated: true,
      });

      return data as unknown as Auth;
    } catch (error) {
      console.error('Sign in error:', error);
      return null;
    }
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
      login,
      logout,
      signup,
    }),
    [isAuthPending, user, isLoading, isAuthenticated, login, logout, signup],
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
