import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { GetMyProfileResponse } from '../models';

const getMyProfilePath = () => {
  return `${config.apiBaseUrl}my/profile`;
};

const getMyProfile = async () => {
  const response = await get(getMyProfilePath());
  return response.data.user;
};

const useGetMyProfile = () => {
  const { data, error, isLoading } = useQuery<GetMyProfileResponse>({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
  });

  return { data, error, isLoading };
};

export default useGetMyProfile;
