'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { signIn } from '@/lib/auth-client';
import { SignInSchema, SignInFormValues } from '@/lib/auth-schemas';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.data) {
        // Successful sign in
        router.push('/dashboard');
        router.refresh(); // Refresh to update auth state
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className={errors.email ? 'border-red-300 focus-visible:ring-red-500' : ''}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  className={errors.password ? 'border-red-300 focus-visible:ring-red-500' : ''}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-[#6D5DF6] to-[#4B3DF6] hover:from-[#5B4BF5] hover:to-[#3D2DF5] text-white font-medium py-2.5"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-[#6D5DF6] hover:text-[#5B4BF5] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
