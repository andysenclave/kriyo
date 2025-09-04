import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/app/hooks/projects/models';

const getProjectDetailPath = (projectId: string) => {
  return `${config.apiBaseUrl}my/projects/${projectId}`;
};

const getProjectDetail = async (projectId: string): Promise<Project> => {
  const response = await get(getProjectDetailPath(projectId));
  return response.data;
};

export const useProjectDetail = (projectId: string) => {
  const { data, error, isLoading, refetch } = useQuery<Project>({
    queryKey: ['projectDetail', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
