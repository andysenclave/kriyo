import * as Yup from 'yup';

export const SignInSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const SignUpSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export type SignInFormValues = Yup.InferType<typeof SignInSchema>;
export type SignUpFormValues = Yup.InferType<typeof SignUpSchema>;
