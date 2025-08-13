'use client';

import { Auth } from '@/app/providers/AuthProvider/models';
import SignupPayload from '../models';
import { authClient } from '@/lib/authClient';
import config from '@/services/api/config';

interface SignupData {
  signup: (signupPayload: SignupPayload) => Promise<Auth | null>;
}

const useSignup = (): SignupData => {
  const signup = async (userData: SignupPayload): Promise<Auth | null> => {
    try {
      const { data, error } = await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        callbackURL: `${config.appBaseUrl}/dashboard`,
      });

      console.log('Signup response:', { data, error });

      return data as unknown as Auth;
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
