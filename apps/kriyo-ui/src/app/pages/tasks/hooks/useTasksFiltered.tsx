import { useMemo } from 'react';
import { Task } from '@/app/hooks/tasks/models';
import { useSearchTasks } from '@/app/hooks';

export const useTasksFiltered = (filter: string) => {
  const { data, error, isLoading } = useSearchTasks('');

  const filteredData = useMemo(() => {
    if (!data?.tasks) return { tasks: [] };

    let filteredTasks = [...data.tasks];

    switch (filter) {
      case 'overdue':
        filteredTasks = data.tasks.filter((task: Task) => {
          if (!task.dueDate) return false;
          const dueDate = new Date(task.dueDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return dueDate < today && task.status !== 'done' && task.status !== 'cancelled';
        });
        break;
      case 'high-priority':
        filteredTasks = data.tasks.filter((task: Task) => task.priority === 'high');
        break;
      case 'all':
      default:
        break;
    }

    return { tasks: filteredTasks };
  }, [data, filter]);

  return {
    data: filteredData,
    error,
    isLoading,
  };
};
