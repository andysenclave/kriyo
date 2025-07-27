import MyTasksProvider from '@/app/providers/MyTasksProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardPage from './DashboardPage';

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
