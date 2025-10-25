import React from 'react';
import AddNewProjectBtn from './components/AddNewProject';
import SearchProjectsField from './components/SearchProjects';

const ProjectActions: React.FC = () => {
  return (
    <div
      data-testid="project-action-area"
      className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
    >
      <SearchProjectsField />
      <AddNewProjectBtn />
    </div>
  );
};

export default ProjectActions;
