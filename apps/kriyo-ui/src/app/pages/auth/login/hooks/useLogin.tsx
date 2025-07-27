import { Auth } from '@/app/providers/AuthProvider/models';
import apiConfig from '@/services/api/config';
import LoginPayload from '../models';
import { post } from '@/services/api/axios';
import config from '@/services/api/config';

interface LoginData {
  login: (loginPayload: LoginPayload) => Promise<Auth | null>;
}

const getLoginPath = () => {
  return `${apiConfig.baseUrl}${apiConfig.loginUrl}`;
};

const useLogin = (): LoginData => {
  const login = async (credentials: LoginPayload) => {
    try {
      const response = await post(getLoginPath(), credentials);

      if (response.data.token && response.data.user) {
        const authData = (await response.data) as Auth;

        localStorage.setItem(config.authTokenKey, authData.token);
        localStorage.setItem(config.userKey, JSON.stringify(authData.user));

        return authData;
      }

      return null;
    } catch (error) {
      console.error('Sign in error:', error);
      return null;
    }
  };

  return {
    login,
  };
};

export default useLogin;
