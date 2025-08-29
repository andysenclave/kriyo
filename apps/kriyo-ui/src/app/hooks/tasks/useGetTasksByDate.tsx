import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { SearchTasksResponse } from './models';

const getTasksByDatePath = (date: string) => {
  return `${config.apiBaseUrl}my/tasks/dueDate/${date}`;
};

const getTasksByDate = async (date: string) => {
  const response = await get(getTasksByDatePath(date));
  return response.data;
};

const useTasksByDate = (date: string) => {
  const trimmedDate = date.trim();

  const { data, error, isLoading } = useQuery<SearchTasksResponse>({
    queryKey: ['dashboardTasks', trimmedDate],
    queryFn: () => getTasksByDate(trimmedDate),
    placeholderData: (previousData) => previousData,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useTasksByDate;
