'use client';
import { FaRegClock, FaRegFlag } from 'react-icons/fa';
import PlannedTaskList from './components/TaskList';
import TaskSummaryCard from './components/TaskSummaryCard';
import UserGreeting from './components/UserGreeting';

export interface PlannedTasksProps {
  userName: string;
}

const PlannedTasks: React.FC<PlannedTasksProps> = ({ userName }) => {
  return (
    <div className="flex-1 min-w-[320px]">
      <UserGreeting userName={userName} />
      <div className="gap-4 mb-6 flex">
        <TaskSummaryCard
          title="Overdue tasks"
          count={12}
          color="primary"
          icon={<FaRegClock size={28} />}
        />
        <TaskSummaryCard
          title="High priority tasks"
          count={5}
          color="danger"
          icon={<FaRegFlag size={28} />}
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-base">Planned tasks</div>
        <button className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
          View all <span>→</span>
        </button>
      </div>
      <PlannedTaskList />
    </div>
  );
};

export default PlannedTasks;
