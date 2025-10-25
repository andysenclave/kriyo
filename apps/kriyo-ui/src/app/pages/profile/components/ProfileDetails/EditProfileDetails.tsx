/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { EditProfileDetailsSchemaYup, EditProfileFormValues } from './EditProfileDetailsSchemaYup';
import { MyProfile } from '../../models';
import useUpdateMyProfile from '../../hooks/useUpdateMyProfile';

interface EditProfileDetailsProps {
  user: MyProfile;
  onStopEditing: () => void;
}

const EditProfileDetails = ({ onStopEditing, user }: EditProfileDetailsProps) => {
  const { updateProfile, isPending } = useUpdateMyProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: yupResolver(EditProfileDetailsSchemaYup),
    defaultValues: {
      ...user,
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormValues> = (data: Partial<MyProfile>) => {
    updateProfile({ payload: data });
    onStopEditing();
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name={'name' as FieldPath<EditProfileFormValues>}
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Name"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
        />
        <Controller
          name={'email' as FieldPath<EditProfileFormValues>}
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Email ID"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
        />
        <Controller
          name={'phone' as FieldPath<EditProfileFormValues>}
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
        />
        <Controller
          name={'password' as FieldPath<EditProfileFormValues>}
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="password"
                placeholder="Password"
                className="w-full border rounded px-3 py-2"
                disabled
              />
            </div>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onStopEditing}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer text-base bg-gray-300 hover:bg-gray-400 font-semibold"
            size="lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 cursor-pointer text-base font-semibold"
            size="lg"
          >
            {isPending ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileDetails;
