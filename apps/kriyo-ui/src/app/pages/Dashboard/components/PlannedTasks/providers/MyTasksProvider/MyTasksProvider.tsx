'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useGetMyTasks } from './hooks';
import { MyTasksContextData } from './hooks/useGetMyTasks';

const MyTasksContext = createContext<MyTasksContextData>({ tasks: [], tasksCount: 0 });

const MyTasksProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetMyTasks();

  return <MyTasksContext.Provider value={data}>{children}</MyTasksContext.Provider>;
};

export const useMyTasks = () => useContext(MyTasksContext);

export default MyTasksProvider;
