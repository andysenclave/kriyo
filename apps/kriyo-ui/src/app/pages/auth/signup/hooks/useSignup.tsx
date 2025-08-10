'use client';

import { Auth } from '@/app/providers/AuthProvider/models';
// import apiConfig from '@/services/api/config';
import SignupPayload from '../models';
// import { post } from '@/services/api/axios';
// import config from '@/services/api/config';
import { authClient } from '@/lib/authClient';

interface SignupData {
  signup: (signupPayload: SignupPayload) => Promise<Auth | null>;
}

// const getSignupPath = () => {
//   return `${apiConfig.baseUrl}${apiConfig.signupUrl}`;
// };

const useSignup = (): SignupData => {
  const signup = async (userData: SignupPayload): Promise<Auth | null> => {
    try {
      // const response = await post(getSignupPath(), userData);

      // if (response.data.token && response.data.user) {
      //   const authData = (await response.data) as Auth;

      //   localStorage.setItem(config.authTokenKey, authData.token);
      //   localStorage.setItem(config.userKey, JSON.stringify(authData.user));

      //   return authData;
      // }

      const { data, error } = await authClient.signUp.email(
        {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          callbackURL: '/dashboard',
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
          },
        }
      );

      console.log('Signup response:', { data, error });

      return null;
    } catch (error) {
      console.error('Sign in error:', error);
      return null;
    }
  };

  return {
    signup,
  };
};

export default useSignup;
