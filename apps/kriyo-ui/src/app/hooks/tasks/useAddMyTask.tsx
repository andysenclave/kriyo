import { post } from '@/services/api/axios';
import config from '@/services/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from './models';

type NewTask = Partial<Task>;
interface AddNewTaskResponse {
  task: Task;
}

const addMyTaskPath = () => {
  return `${config.apiBaseUrl}my/tasks`;
};

const addMyTask = async (payload: NewTask) => {
  const response = await post(addMyTaskPath(), payload);
  return response.data;
};

const useAddMyTask = () => {
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation<AddNewTaskResponse, Error, NewTask>({
    mutationFn: addMyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardTasks'] });
    },
  });

  return {
    data,
    addMyTask: mutate,
    isPending,
  };
};

export default useAddMyTask;
