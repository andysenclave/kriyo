'use client';

import { Project } from '@/app/hooks/projects/models';
import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';

export type ProjectFilter = 'all' | 'high';

const getMyProjectsPath = () => {
  return `${config.apiBaseUrl}my/projects`;
};

const getMyProjects = async (): Promise<Project[]> => {
  const response = await get(getMyProjectsPath());
  return response.data?.projects;
};

const transform = (data: Project[], filter: ProjectFilter) => {
  switch (filter) {
    case 'all':
      return data;
    case 'high':
      return data.filter((project) => project.priority === 'high');
    default:
      return data;
  }
};

const useGetMyProjects = (filter: ProjectFilter) => {
  const { data, error, isLoading } = useQuery<Project[]>({
    queryKey: ['getMyProjects'],
    queryFn: () => getMyProjects(),
    placeholderData: (previousData) => previousData,
    select: (data) => transform(data, filter),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetMyProjects;
