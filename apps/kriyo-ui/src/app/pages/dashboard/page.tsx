import MyTasksProvider from '@/app/providers/MyTasksProvider';
import DashboardPage from './Dashboard';
import { ProtectedRoute } from '@/app/components/auth';

const DashboardPageWithProvider: React.FC = () => {
  return (
    <ProtectedRoute>
      <MyTasksProvider>
        <DashboardPage />
      </MyTasksProvider>
    </ProtectedRoute>
  );
};

export default DashboardPageWithProvider;
