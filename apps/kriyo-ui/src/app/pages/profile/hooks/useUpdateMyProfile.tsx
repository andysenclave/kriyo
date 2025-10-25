import { put } from '@/services/api/axios';
import config from '@/services/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetMyProfileResponse, MyProfile } from '../models';

type UpdatedProfile = Partial<MyProfile>;

interface UpdateProfileParams {
  payload: UpdatedProfile;
}

const updateMyProfilePath = () => {
  return `${config.apiBaseUrl}my/profile`;
};

const updateMyProfile = async ({ payload }: UpdateProfileParams) => {
  const response = await put(updateMyProfilePath(), payload);
  return response.data;
};

const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation<GetMyProfileResponse, Error, UpdateProfileParams>(
    {
      mutationFn: updateMyProfile,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      },
    },
  );

  return {
    data,
    updateProfile: mutate,
    isPending,
  };
};

export default useUpdateMyProfile;
