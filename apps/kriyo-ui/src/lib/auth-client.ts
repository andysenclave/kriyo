import { post } from '@/services/api/axios';
import { User, AuthResponse, SignInRequest, SignUpRequest } from './auth';

const AUTH_TOKEN_KEY = 'kriyo_auth_token';
const USER_KEY = 'kriyo_user';

// API endpoints - these should point to your user-service
const API_BASE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:3001';

export class AuthClient {
  // Sign in with email and password
  static async signIn(
    credentials: SignInRequest
  ): Promise<{ data?: AuthResponse; error?: string }> {
    try {
      const response = await post(`${API_BASE_URL}/auth/signin`, credentials);

      if (response.data.token && response.data.user) {
        // Store auth data in localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

        return { data: response.data };
      }

      return { error: 'Invalid response from server' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'Invalid email or password' };
    }
  }

  // Sign up with email and password
  static async signUp(userData: SignUpRequest): Promise<{ data?: AuthResponse; error?: string }> {
    try {
      const response = await post(`${API_BASE_URL}/auth/signup`, userData);

      if (response.data.token && response.data.user) {
        // Store auth data in localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

        return { data: response.data };
      }

      return { error: 'Invalid response from server' };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'Failed to create account' };
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;

    try {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // Get current auth token
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!(this.getToken() && this.getCurrentUser());
  }
}

// Export convenience functions
export const signIn = {
  email: AuthClient.signIn,
};

export const signUp = {
  email: AuthClient.signUp,
};

export const signOut = AuthClient.signOut;
export const getSession = () => {
  const user = AuthClient.getCurrentUser();
  const token = AuthClient.getToken();

  return user && token ? { user, token } : null;
};

// React hook for session (simplified version)
export const useSession = () => {
  const session = getSession();

  return {
    data: session,
    isPending: false,
  };
};
