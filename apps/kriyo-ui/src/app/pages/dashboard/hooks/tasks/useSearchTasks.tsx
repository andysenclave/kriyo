import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { SearchTasksResponse } from './models';

const getSearchTasksPath = (searchTerm: string) => {
  const searchQuery = encodeURIComponent(searchTerm);
  return `${config.apiBaseUrl}protected/tasks/search/${searchQuery}`;
};

const getSearchTasks = async (searchTerm: string) => {
  const response = await get(getSearchTasksPath(searchTerm));
  return response.data;
};

const useSearchTasks = (searchTerm: string) => {
  const trimmedSearchTerm = searchTerm.trim();
  const shouldSearch = trimmedSearchTerm.length > 2;

  const { data, error, isLoading } = useQuery<SearchTasksResponse>({
    queryKey: ['dashboardTasks', searchTerm],
    queryFn: () => getSearchTasks(searchTerm),
    enabled: shouldSearch,
    placeholderData: (previousData) => previousData,
  });

  console.log({ data, error, isLoading, config });
  return {
    data: shouldSearch ? data : { tasks: [] },
    error,
    isLoading: shouldSearch ? isLoading : false,
  };
};

export default useSearchTasks;
