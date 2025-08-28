import { get } from '@/services/api/axios';
import config from '@/services/api/config';
import { useQuery } from '@tanstack/react-query';
import { GetDashboardTasksResponse } from './models';

const getDashboardTasksPath = () => {
  return `${config.apiBaseUrl}my/dashboard/tasks`;
};

const getDashboardTasks = async () => {
  const response = await get(getDashboardTasksPath());
  return response.data;
};

const transform = (data: GetDashboardTasksResponse) => {
  return {
    overdue: data.overdue,
    highPriority: data.highPriority,
    tasks: data.tasks.slice(0, 4),
  };
};

const useDashboardTasks = () => {
  const { data, error, isLoading } = useQuery<GetDashboardTasksResponse>({
    queryKey: ['dashboardTasks'],
    queryFn: getDashboardTasks,
    select: transform,
  });

  return { data, error, isLoading };
};

export default useDashboardTasks;
