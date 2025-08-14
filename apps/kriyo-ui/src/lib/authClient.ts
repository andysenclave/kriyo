import config from '@/services/api/config';
import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: config.authBaseUrl,
});
