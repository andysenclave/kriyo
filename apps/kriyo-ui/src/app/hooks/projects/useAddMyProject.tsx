import { post } from '@/services/api/axios';
import config from '@/services/api/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from './models';

type NewProject = Partial<Project>;
interface AddNewProjectResponse {
  project: Project;
}

const addMyProjectPath = () => {
  return `${config.apiBaseUrl}my/projects`;
};

const addMyProject = async (payload: NewProject) => {
  const response = await post(addMyProjectPath(), payload);
  return response.data;
};

const useAddMyProject = () => {
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation<AddNewProjectResponse, Error, NewProject>({
    mutationFn: addMyProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardProjects', 'getMyProjects'] });
    },
  });

  return {
    data,
    addMyProject: mutate,
    isPending,
  };
};

export default useAddMyProject;
