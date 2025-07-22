'use client';

import { get } from '@/app/services/api/axios';
import apiConfig from '@/services/apiConfig';
import { Task } from '../models';
import { useEffect, useState } from 'react';
import seedGetMyPendingTasks from '@/app/mocks/seedData/tasksHandlers/seedGetMyPendingTasks';

interface ScopedTasks {
  pending: Task[];
  overdue: Task[];
}

interface TaskDataState {
  tasks: Task[];
  isLoading: boolean;
  hasFetched: boolean;
  scopedTasks?: ScopedTasks;
}

const PENDING_TASKS_STATUS = ['todo', 'in-progress', 'in-review', 'blocked'];

const getMyPendingTasksPath = () => {
  return `${apiConfig.baseUrl}${apiConfig.myPendingTasksUrl}`;
};

const getMyPendingTasksData = async (): Promise<Task[]> => {
  try {
    const path = getMyPendingTasksPath();
    const response = await get(path);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching my pending tasks:', error);
    return seedGetMyPendingTasks.response.content as Task[]; // Fallback to seed data in case of error
  }
};

const useGetMyPendingTasks = (): TaskDataState => {
  const [state, setState] = useState<TaskDataState>({
    tasks: [],
    isLoading: false,
    hasFetched: false,
  });

  const getMyPendingTasks = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));

    const response = await getMyPendingTasksData();

    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      hasFetched: true,
      tasks: response,
    }));
  };

  useEffect(() => {
    getMyPendingTasks();
  }, []);

  return state;
};

export default useGetMyPendingTasks;
