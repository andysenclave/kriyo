'use client';

import { ArrowLeft, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProjectDetailsHeaderProps {
  isEditing: boolean;
  onStartEditing: () => void;
  hasError?: boolean;
  errorMessage?: string;
}

const ProjectDetailsHeader = ({
  isEditing,
  onStartEditing,
  hasError,
  errorMessage,
}: ProjectDetailsHeaderProps) => {
  const router = useRouter();
  const showEditButton = !isEditing && !hasError;

  return (
    <div className="flex flex-row justify-between items-center">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </button>
      {showEditButton && (
        <button
          onClick={onStartEditing}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Project
        </button>
      )}
      {hasError && (
        <div className="text-center py-12">
          <p className="text-red-600">{errorMessage || 'Project not found'}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsHeader;
