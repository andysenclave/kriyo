import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { GetDashboardProjectsResponse } from './models';

const getDashboardProjectsPath = () => {
  return `${config.apiBaseUrl}my/dashboard/projects`;
};

const getDashboardProjects = async () => {
  const response = await get(getDashboardProjectsPath());
  return response.data;
};

const useDashboardProjects = () => {
  const { data, error, isLoading } = useQuery<GetDashboardProjectsResponse>({
    queryKey: ['dashboardProjects'],
    queryFn: getDashboardProjects,
  });

  console.log({ data, error, isLoading, config });
  return { data, error, isLoading };
};

export default useDashboardProjects;
