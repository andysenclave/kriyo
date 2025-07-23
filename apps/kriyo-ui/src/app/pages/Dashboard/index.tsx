import MyTasksProvider from '@/app/providers/MyTasksProvider';
import DashboardPage from './DashboardPage';

const DashboardPageWithProvider: React.FC = () => {
  return (
    <MyTasksProvider>
      <DashboardPage />
    </MyTasksProvider>
  );
};

export default DashboardPageWithProvider;
