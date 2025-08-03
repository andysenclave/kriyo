import config from '@/services/api/config';
import { User } from './models';

export default class AuthClient {
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;

    try {
      const userStr = localStorage.getItem(config.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(config.authTokenKey);
  }

  static isAuthenticated(): boolean {
    return !!(this.getToken() && this.getCurrentUser());
  }
}

export const getSession = () => {
  const user = AuthClient.getCurrentUser();
  const token = AuthClient.getToken();

  return user && token ? { user, token } : null;
};
