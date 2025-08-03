import { Task } from '@/app/providers/MyTasksProvider/models';
import { post } from '@/services/api/axios';
import config from '@/services/api/config';

interface UseAddTaskResult {
  addMyTask: (task: Partial<Task>) => Promise<void>;
}

const addMyTaskPath = () => {
  return `${config.baseUrl}${config.addMyTask}`;
};

export default function useAddTask(): UseAddTaskResult {
  const addMyTask = async (task: Partial<Task>): Promise<void> => {
    try {
      const path = addMyTaskPath();
      const response = await post(path, task);

      return response.data.content;
    } catch (error) {
      console.error('Error fetching my pending tasks:', error);
      return; // Fallback to seed data in case of error
    }
  };
  return { addMyTask };
}
