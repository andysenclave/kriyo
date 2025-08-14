'use client';

import MyTasksProvider from '@/app/providers/MyTasksProvider';
import DashboardPage from './Dashboard';

const DashboardPageWithProvider: React.FC = () => {
  return (
    <MyTasksProvider>
      <DashboardPage />
    </MyTasksProvider>
  );
};

export default DashboardPageWithProvider;
