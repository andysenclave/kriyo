import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogInFormValues, LogInSchema } from './LoginFormSchemaYup';
import useLogin from './hooks';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormValues>({
    resolver: yupResolver(LogInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LogInFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (result && result.token) {
        router.push('/dashboard');
        router.refresh(); // Refresh to update auth state
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default LoginForm;
