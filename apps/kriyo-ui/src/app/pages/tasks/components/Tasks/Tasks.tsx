'use client';

import { usePathname } from 'next/navigation';
import TasksHeader from './TasksHeader';
import TasksList from './TasksList';
import { TaskFilter } from '../../hooks';

interface TasksProps {
  filter?: TaskFilter;
}

const Tasks: React.FC<TasksProps> = ({ filter }) => {
  const pathname = usePathname();

  let appliedFilter = filter || 'all';

  if (!appliedFilter) {
    if (pathname.includes('/overdue')) {
      appliedFilter = 'overdue';
    } else if (pathname.includes('/high-priority')) {
      appliedFilter = 'high-priority';
    }
  }

  return (
    <div className=" bg-gray-50">
      <div className="p-4 w-full">
        <TasksHeader currentFilter={appliedFilter} />
        <TasksList filter={appliedFilter} />
      </div>
    </div>
  );
};

export default Tasks;
