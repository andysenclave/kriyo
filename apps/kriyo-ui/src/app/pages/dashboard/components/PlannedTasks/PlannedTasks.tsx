'use client';
import { FaRegClock, FaRegFlag } from 'react-icons/fa';
import PlannedTaskList from './components/TaskList';
import TaskSummaryCard from './components/TaskSummaryCard';
import UserGreeting from './components/UserGreeting';
import { ViewAllBtn } from '@/app/components/buttons';
import { useDashboardTasks } from '../../hooks';
import { useRouter } from 'next/navigation';

export interface PlannedTasksProps {
  userName: string;
}

const PlannedTasks: React.FC<PlannedTasksProps> = ({ userName }) => {
  const response = useDashboardTasks();
  const { data } = response;
  const { overdue, highPriority } = data || {};
  const router = useRouter();

  const handleViewAllTasksClick = () => {
    router.push('/tasks');
  };

  return (
    <div className="flex-1 min-w-[320px]">
      <UserGreeting userName={userName} />
      <div className="gap-4 mb-2 flex">
        <TaskSummaryCard
          title="Overdue tasks"
          count={overdue || 0}
          color="primary"
          icon={<FaRegClock size={24} />}
          link={'/tasks/overdue'}
        />
        <TaskSummaryCard
          title="High priority tasks"
          count={highPriority || 0}
          color="danger"
          icon={<FaRegFlag size={24} />}
          link={'/tasks/high-priority'}
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-base">Planned tasks</h4>
        <ViewAllBtn onClick={handleViewAllTasksClick} />
      </div>
      <PlannedTaskList />
    </div>
  );
};

export default PlannedTasks;
