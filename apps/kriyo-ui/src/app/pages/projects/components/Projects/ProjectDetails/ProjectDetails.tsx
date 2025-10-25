'use client';

import { useState } from 'react';
import { useProjectDetail } from '../../../hooks';
import ProjectDetailsSkeleton from './components/ProjectDetailsSkeleton';
import ProjectDetailsHeader from './components/ProjectDetailsHeader';
import ViewProjectDetails from './components/ViewProjectDetails';
import EditProjectDetails from './components/EditProjectDetails';

interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetails = ({ projectId }: ProjectDetailProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: project, isLoading, error, refetch } = useProjectDetail(projectId);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
    refetch();
  };

  if (isLoading) return <ProjectDetailsSkeleton />;

  return (
    <div className="w-full p-4">
      <ProjectDetailsHeader
        isEditing={isEditing}
        onStartEditing={handleStartEditing}
        hasError={!!error}
        errorMessage={error?.message}
      />
      {project && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {isEditing ? (
            <EditProjectDetails
              projectId={project.id}
              onStopEditing={handleStopEditing}
              project={project}
            />
          ) : (
            <ViewProjectDetails project={project} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
