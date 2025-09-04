import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { SearchProjectsResponse } from './models';

const getSearchProjectsPath = (searchTerm: string) => {
  const searchQuery = encodeURIComponent(searchTerm);
  return `${config.apiBaseUrl}protected/projects/search/${searchQuery}`;
};

const getSearchProjects = async (searchTerm: string) => {
  const response = await get(getSearchProjectsPath(searchTerm));
  return response.data;
};

const useSearchProjects = (searchTerm: string) => {
  const trimmedSearchTerm = searchTerm.trim();
  const shouldSearch = trimmedSearchTerm.length > 2;

  const { data, error, isLoading } = useQuery<SearchProjectsResponse>({
    queryKey: ['dashboardProjects', searchTerm],
    queryFn: () => getSearchProjects(searchTerm),
    enabled: shouldSearch,
    placeholderData: (previousData) => previousData,
  });

  return {
    data: shouldSearch ? data : { projects: [] },
    error,
    isLoading: shouldSearch ? isLoading : false,
  };
};

export default useSearchProjects;
