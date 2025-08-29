import React from 'react';
import { Button } from '@/components/ui/button';
import { Project } from '../../hooks/projects/models';
import { useDashboardProjects } from '../../hooks';

const statusColor: Record<string, string> = {
  'For review': 'bg-pink-100 text-pink-600',
  'In progress': 'bg-blue-100 text-blue-600',
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});

const ProjectList: React.FC = () => {
  const { data } = useDashboardProjects();
  return (
    <div className="rounded-2xl bg-white shadow p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-base">Your projects</div>
        <Button
          variant="ghost"
          className="text-primary text-xs font-medium flex items-center gap-1"
        >
          View all <span>→</span>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th className="text-left font-medium py-2 px-2">Status</th>
              <th className="text-left font-medium py-2 px-2">Task</th>
              <th className="text-left font-medium py-2 px-2">Project</th>
              <th className="text-left font-medium py-2 px-2">Description</th>
              <th className="text-left font-medium py-2 px-2">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.projects.map((project: Project, idx: number) => (
              <tr key={idx} className="border-t last:border-b">
                <td className="py-2 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-2 px-2 max-w-[180px] truncate">{project?.tasks ?? ''}</td>
                <td className="py-2 px-2">{project.title}</td>
                <td className="py-2 px-2">{project?.description ?? ''}</td>
                <td className="py-2 px-2">
                  {dateFormatter.format(new Date(project?.targetDate ?? ''))}
                </td>
                <td className="py-2 px-2">
                  <Button variant="link" className="text-primary px-0 text-xs h-auto">
                    Go to task
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
