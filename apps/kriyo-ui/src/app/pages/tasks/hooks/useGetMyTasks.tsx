'use client';

import { Task } from '@/app/hooks/tasks/models';
import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';

export type TaskFilter = 'all' | 'overdue' | 'high-priority';

const getMyTasksPath = () => {
  return `${config.apiBaseUrl}my/tasks`;
};

const getMyTasks = async (): Promise<Task[]> => {
  const response = await get(getMyTasksPath());
  return response.data?.tasks;
};

const transform = (data: Task[], filter: TaskFilter) => {
  switch (filter) {
    case 'overdue':
      return data.filter((task) => new Date(task?.dueDate ?? null) < new Date());
    case 'high-priority':
      return data.filter((task) => task.priorityRank === 1);
    default:
      return data;
  }
};

const useGetMyTasks = (filter: TaskFilter) => {
  const { data, error, isLoading } = useQuery<Task[]>({
    queryKey: ['getMyTasks'],
    queryFn: () => getMyTasks(),
    placeholderData: (previousData) => previousData,
    select: (data) => transform(data, filter),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetMyTasks;
