import * as Yup from 'yup';
import { MyProfile } from '../../models';

export const EditProfileDetailsSchemaYup = Yup.object<MyProfile>({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
});

export type EditProfileFormValues = Yup.InferType<typeof EditProfileDetailsSchemaYup>;
