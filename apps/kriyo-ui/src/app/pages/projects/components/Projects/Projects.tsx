'use client';

import { usePathname } from 'next/navigation';
import ProjectsHeader from './ProjectsHeader';
import ProjectsList from './ProjectsList';
import { ProjectFilter } from '../../hooks';

interface ProjectsProps {
  filter?: ProjectFilter;
}

const Projects: React.FC<ProjectsProps> = ({ filter }) => {
  const pathname = usePathname();

  let appliedFilter = filter || 'all';

  if (!appliedFilter) {
    if (pathname.includes('/high')) {
      appliedFilter = 'high';
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="p-4 w-full">
        <ProjectsHeader currentFilter={appliedFilter} />
        <ProjectsList filter={appliedFilter} />
      </div>
    </div>
  );
};

export default Projects;
