'use client';

import { PriorityLabel, StatusLabel } from '@/app/components/labels';
import { Project } from '@/app/hooks/projects/models';
import { Calendar, Clock, User } from 'lucide-react';

interface ViewProjectDetailsProps {
  project: Project;
}

const ViewProjectDetails = ({ project }: ViewProjectDetailsProps) => {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
          <div className="flex flex-row space-x-4">
            <PriorityLabel priority={project?.priority ?? 'none'} />
            <StatusLabel status={project.status} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span className="text-sm">Created by: {project.owner?.name as string}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {project.targetDate && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Due: {new Date(project.targetDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {project.assignedTo && (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">Assigned to: {project.assignedTo?.name}</span>
            </div>
          )}
        </div>
      </div>

      {project.description && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
          <div className="text-gray-700 whitespace-pre-wrap">{project.description}</div>
        </div>
      )}
    </div>
  );
};

export default ViewProjectDetails;
