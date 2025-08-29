import { put } from '@/services/api/axios';
import config from '@/services/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from './models';

type UpdatedTask = Partial<Task>;
interface UpdateTaskResponse {
  task: UpdatedTask;
}

interface UpdateTaskParams {
  id: string;
  payload: UpdatedTask;
}

const updateTaskPath = (id: string) => {
  return `${config.apiBaseUrl}my/tasks/${id}`;
};

const updateTask = async ({ id, payload }: UpdateTaskParams) => {
  const response = await put(updateTaskPath(id), payload);
  return response.data;
};

const useUpdateTaskDetail = () => {
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation<UpdateTaskResponse, Error, UpdateTaskParams>({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardTasks', 'getMyTasks'] });
    },
  });

  return {
    data,
    updateTask: mutate,
    isPending,
  };
};

export default useUpdateTaskDetail;
