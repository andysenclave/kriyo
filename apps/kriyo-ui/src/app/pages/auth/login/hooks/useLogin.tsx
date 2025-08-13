import { Auth } from '@/app/providers/AuthProvider/models';
import LoginPayload from '../models';
import config from '@/services/api/config';
import { authClient } from '@/lib/authClient';

interface LoginData {
  login: (loginPayload: LoginPayload) => Promise<Auth | null>;
}

const useLogin = (): LoginData => {
  const login = async (credentials: LoginPayload) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
        callbackURL: `${config.appBaseUrl}/dashboard`,
      });

      console.log('Login response:', { data, error });

      return data as unknown as Auth;
    } catch (error) {
      console.error('Log in error:', error);
      return null;
    }
  };

  return {
    login,
  };
};

export default useLogin;
