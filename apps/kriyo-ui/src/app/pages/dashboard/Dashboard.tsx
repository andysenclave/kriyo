'use client';
import PlannedTasks from './components/PlannedTasks';
import ProjectList from './components/ProjectList';
import Calendar from './components/Calendar';
import { useAuth } from '@/app/providers/AuthProvider';
import { TaskActions } from '@/app/components/task';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 w-full">
        <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 flex flex-col gap-6">
            <PlannedTasks userName={user?.name || 'User'} />
          </div>
          <div className="md:col-span-1">
            <TaskActions />
            <Calendar />
          </div>
        </div>
        <ProjectList />
      </div>
    </div>
  );
};

export default Dashboard;
