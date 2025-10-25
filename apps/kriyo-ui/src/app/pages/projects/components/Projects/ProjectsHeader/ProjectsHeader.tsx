'use client';

import { useRouter } from 'next/navigation';
import { ProjectFilter } from '../../../hooks';
import { ProjectActions } from '@/app/components/project';

interface ProjectsHeaderProps {
  currentFilter: ProjectFilter;
}

const filterOptions = [
  { key: 'all', label: 'My Projects', path: '/projects', header: 'My Projects' },
  { key: 'high', label: 'High', path: '/projects/high', header: 'High Priority Projects' },
];

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ currentFilter }) => {
  const router = useRouter();

  const handleFilterChange = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mb-8">
      <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {filterOptions.find((opt) => opt.key === currentFilter)?.header}
          </h1>
        </div>
        <div className="md:col-span-1">
          <ProjectActions />
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {filterOptions.map((option) => {
            const isActive =
              (option.key === 'all' && currentFilter === 'all') || option.key === currentFilter;

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

export default ProjectsHeader;
