'use client';

import { get } from '@/app/services/api/axios';
import apiConfig from '@/services/apiConfig';
import { Task } from '../models';
import { useEffect, useState } from 'react';
import seedGetMyPendingTasks from '@/app/mocks/seedData/tasksHandlers/seedGetMyPendingTasks';

interface ScopedTasks {
  pending: Task[];
  pendingCount: number;
  overdue: Task[];
  overdueCount: number;
  highPriority: Task[];
  highPriorityCount: number;
}

export interface MyTasksContextData {
  tasks: Task[];
  tasksCount: number;
  scopedTasks?: ScopedTasks;
}

interface TaskDataState {
  data: MyTasksContextData;
  isLoading: boolean;
  hasFetched: boolean;
}

const initialState: TaskDataState = Object.freeze({
  data: {
    tasks: [],
    tasksCount: 0,
  },
  isLoading: false,
  hasFetched: false,
});

const PENDING_TASKS_STATUS = ['todo', 'in-progress', 'in-review', 'blocked'];

const getMyTasksPath = () => {
  return `${apiConfig.baseUrl}${apiConfig.myTasksUrl}`;
};

const getMyTasksData = async (): Promise<Task[]> => {
  try {
    const path = getMyTasksPath();
    const response = await get(path);

    return response.data.content;
  } catch (error) {
    console.error('Error fetching my pending tasks:', error);
    return seedGetMyPendingTasks.response.content as Task[]; // Fallback to seed data in case of error
  }
};

const getMyOpenTasks = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => PENDING_TASKS_STATUS.includes(task.status));
};

const getMyOverDueTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(
    (task) =>
      PENDING_TASKS_STATUS.includes(task.status) &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  );
};

const getMyHighPriorityTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(
    (task) => PENDING_TASKS_STATUS.includes(task.status) && task.priority === 'high'
  );
};

const useGetMyTasks = (): TaskDataState => {
  const [state, setState] = useState<TaskDataState>(initialState);

  const getMyPendingTasks = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));

    const response = await getMyTasksData();
    const pendingTasks = getMyOpenTasks(response);
    const overdueTasks = getMyOverDueTasks(response);
    const highPriorityTasks = getMyHighPriorityTasks(response);
    const updatedState = {
      tasks: response,
      tasksCount: response.length,
      scopedTasks: {
        pending: pendingTasks,
        pendingCount: pendingTasks.length,
        overdue: overdueTasks,
        overdueCount: overdueTasks.length,
        highPriority: highPriorityTasks,
        highPriorityCount: highPriorityTasks.length,
      },
    };

    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      hasFetched: true,
      data: updatedState,
    }));
  };

  useEffect(() => {
    getMyPendingTasks();
  }, []);

  return state;
};

export default useGetMyTasks;
