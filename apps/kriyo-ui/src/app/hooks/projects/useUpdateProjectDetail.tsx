import { put } from '@/services/api/axios';
import config from '@/services/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from './models';

type UpdatedProject = Partial<Project>;
interface UpdateProjectResponse {
  project: UpdatedProject;
}

interface UpdateProjectParams {
  id: string;
  payload: UpdatedProject;
}

const updateProjectPath = (id: string) => {
  return `${config.apiBaseUrl}my/projects/${id}`;
};

const updateProject = async ({ id, payload }: UpdateProjectParams) => {
  const response = await put(updateProjectPath(id), payload);
  return response.data;
};

const useUpdateProjectDetail = () => {
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation<
    UpdateProjectResponse,
    Error,
    UpdateProjectParams
  >({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardProjects', 'getMyProjects'] });
    },
  });

  return {
    data,
    updateProject: mutate,
    isPending,
  };
};

export default useUpdateProjectDetail;
