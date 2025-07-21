import { FaRegClock, FaRegFlag } from 'react-icons/fa';
import PlannedTaskList, { PlannedTask } from './TaskList';
import TaskSummaryCard from './TaskSummaryCard';

interface PlannedTasksProps {
  plannedTasks: PlannedTask[];
  userName: string;
}

const PlannedTasks: React.FC<PlannedTasksProps> = ({ plannedTasks, userName }) => {
  const tasksCount = plannedTasks.length;

  return (
    <div className="flex-1 min-w-[320px]">
      <div className="text-lg font-semibold mb-1">
        Hello, <span className="text-primary font-bold">{userName}</span>
      </div>
      <div className="text-muted-foreground mb-6 text-sm">
        You have{' '}
        <span className="font-semibold text-primary">
          {tasksCount}
          {` ${tasksCount > 1 ? `tasks` : `task`}`}
        </span>{' '}
        to complete today.
      </div>
      <div className="flex gap-4 mb-6">
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
      <PlannedTaskList tasks={plannedTasks} />
    </div>
  );
};

export default PlannedTasks;
