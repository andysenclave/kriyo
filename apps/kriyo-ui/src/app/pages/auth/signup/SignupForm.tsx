import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignUpFormValues, SignUpSchema } from './SignupFormSchemaYup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './phone-input.css';
import { useAuth } from '@/app/providers/AuthProvider';

const SignupForm: React.FC = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log({ data });

      const result = await signup(data);

      if (result && result.token) {
        router.push('/dashboard');
        router.refresh(); // Refresh to update auth state
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An error occurred during sign up. Please try again.');
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
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Enter your full name"
                disabled={isLoading}
                className={errors.name ? 'border-red-300 focus-visible:ring-red-500' : ''}
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

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
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                international
                defaultCountry="IN"
                value={value}
                onChange={onChange}
                disabled={isLoading}
                className={`phone-input ${errors.phone ? 'border-red-300' : ''}`}
                placeholder="Enter your phone number"
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                disabled={isLoading}
                className={
                  errors.confirmPassword ? 'border-red-300 focus-visible:ring-red-500' : ''
                }
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-br from-[#6D5DF6] to-[#4B3DF6] hover:from-[#5B4BF5] hover:to-[#3D2DF5] text-white font-medium py-2.5"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
