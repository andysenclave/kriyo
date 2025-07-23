'use client';
import { FaRegClock, FaRegFlag } from 'react-icons/fa';
import PlannedTaskList from './components/TaskList';
import TaskSummaryCard from './components/TaskSummaryCard';
import UserGreeting from './components/UserGreeting';
import { useMyTasks } from './providers/MyTasksProvider';
import { ViewAllBtn } from '@/app/components/buttons';

export interface PlannedTasksProps {
  userName: string;
}

const PlannedTasks: React.FC<PlannedTasksProps> = ({ userName }) => {
  const { scopedTasks } = useMyTasks();
  const { overdueCount, highPriorityCount } = scopedTasks || {};

  return (
    <div className="flex-1 min-w-[320px]">
      <UserGreeting userName={userName} />
      <div className="gap-4 mb-4 flex">
        <TaskSummaryCard
          title="Overdue tasks"
          count={overdueCount || 0}
          color="primary"
          icon={<FaRegClock size={24} />}
        />
        <TaskSummaryCard
          title="High priority tasks"
          count={highPriorityCount || 0}
          color="danger"
          icon={<FaRegFlag size={24} />}
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-base">Planned tasks</h4>
        <ViewAllBtn />
      </div>
      <PlannedTaskList />
    </div>
  );
};

export default PlannedTasks;
