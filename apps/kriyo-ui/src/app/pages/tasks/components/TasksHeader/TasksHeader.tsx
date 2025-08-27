'use client';

import { useRouter } from 'next/navigation';

interface TasksHeaderProps {
  currentFilter: string;
}

const filterOptions = [
  { key: 'all', label: 'All Tasks', path: '/tasks' },
  { key: 'overdue', label: 'Overdue', path: '/tasks?filter=overdue' },
  { key: 'high-priority', label: 'High Priority', path: '/tasks?filter=high-priority' },
];

export const TasksHeader: React.FC<TasksHeaderProps> = ({ currentFilter }) => {
  const router = useRouter();

  const handleFilterChange = (path: string) => {
    router.push(path);
  };

  const getTitle = () => {
    const option = filterOptions.find(opt => opt.key === currentFilter);
    return option?.label || 'All Tasks';
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{getTitle()}</h1>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {filterOptions.map((option) => {
            const isActive = 
              (option.key === 'all' && currentFilter === 'all') ||
              (option.key === currentFilter);

            return (
              <button
                key={option.key}
                onClick={() => handleFilterChange(option.path)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};