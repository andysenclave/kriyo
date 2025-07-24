'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useGetMyTasks } from './hooks';
import { MyTasksContextData } from './hooks/useGetMyTasks';

const MyTasksContext = createContext<MyTasksContextData | undefined>(undefined);

const MyTasksProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetMyTasks();

  return <MyTasksContext.Provider value={data}>{children}</MyTasksContext.Provider>;
};

export const useMyTasks = () => {
  const context = useContext(MyTasksContext);
  if (context === undefined) {
    throw new Error(
      'useMyTasks must be used within a MyTasksProvider. Make sure your component is wrapped in <MyTasksProvider>.'
    );
  }
  return context;
};

export default MyTasksProvider;
