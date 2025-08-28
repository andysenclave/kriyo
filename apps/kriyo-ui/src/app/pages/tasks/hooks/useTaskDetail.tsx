import { Task } from '@/app/hooks/tasks/models';
import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';

const getTaskDetailPath = (taskId: string) => {
  return `${config.apiBaseUrl}protected/tasks/${taskId}`;
};

const getTaskDetail = async (taskId: string): Promise<Task> => {
  const response = await get(getTaskDetailPath(taskId));
  return response.data;
};

export const useTaskDetail = (taskId: string) => {
  const { data, error, isLoading } = useQuery<Task>({
    queryKey: ['task', taskId],
    queryFn: () => getTaskDetail(taskId),
    enabled: !!taskId,
  });

  return {
    data,
    error,
    isLoading,
  };
};
