import React from 'react';
import { useDashboardProjects } from '../../hooks';
import { Project } from '@/app/hooks/projects/models';
import { StatusLabel } from '@/app/components/labels';
import { ViewAllBtn } from '@/app/components/buttons';
import { useRouter } from 'next/navigation';
import { FaProjectDiagram } from 'react-icons/fa';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});

const ProjectList: React.FC = () => {
  const { data } = useDashboardProjects();
  const router = useRouter();
  const hasNoProjects = !data || data.projects.length === 0;

  const handleViewAllProjectsClick = () => {
    router.push('/projects');
  };

  const handleGoToProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="rounded-2xl bg-white shadow p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-base">Your projects</div>
        <ViewAllBtn onClick={handleViewAllProjectsClick} />
      </div>
      {hasNoProjects ? (
        <div className="text-center py-12">
          <div className="text-gray-600 mb-2 flex justify-center text-2xl">
            <FaProjectDiagram />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-400">{`You don't have any projects yet.`}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs">
                <th className="text-left font-medium py-2 px-2">Status</th>
                <th className="text-left font-medium py-2 px-2">Title</th>
                <th className="text-left font-medium py-2 px-2">Description</th>
                <th className="text-left font-medium py-2 px-2">Target date</th>
                <th className="text-left font-medium py-2 px-2">Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.projects.map((project: Project, idx: number) => (
                <tr key={idx} className="border-t last:border-b">
                  <td className="py-4 px-2">
                    <StatusLabel status={project.status} />
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className="cursor-pointer hover:underline underline-offset-2"
                      onClick={() => handleGoToProjectClick(project.id)}
                    >
                      {project.title}
                    </span>
                  </td>
                  <td className="py-4 px-2">{project?.description ?? ''}</td>
                  <td className="py-4 px-2">
                    {dateFormatter.format(new Date(project?.targetDate ?? ''))}
                  </td>
                  <td className="py-4 px-2">{project?.owner?.name ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
