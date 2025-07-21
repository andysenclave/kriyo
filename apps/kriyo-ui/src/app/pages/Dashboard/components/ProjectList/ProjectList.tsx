import React from 'react';
import { Button } from '@/components/ui/button';

interface ProjectTask {
  status: 'For review' | 'In progress';
  task: string;
  project: string;
  member: string;
  date: string;
}

const statusColor: Record<string, string> = {
  'For review': 'bg-pink-100 text-pink-600',
  'In progress': 'bg-blue-100 text-blue-600',
};

const sampleTasks: ProjectTask[] = [
  {
    status: 'For review',
    task: 'Create a user flow for the second s...',
    project: 'VYM Mobile App Design',
    member: 'Lauren Willis',
    date: 'April, 03',
  },
  {
    status: 'In progress',
    task: 'Scenario for testing mockups with...',
    project: 'VYM Mobile App Design',
    member: 'Paul Rogers',
    date: 'April, 03',
  },
  {
    status: 'In progress',
    task: 'Moodboard for the design workshop...',
    project: 'XYZ Website Design',
    member: 'Amanda Jones-S...',
    date: 'April, 03',
  },
  {
    status: 'In progress',
    task: 'Copy review',
    project: 'VYM Mobile App Design',
    member: 'Michael York',
    date: 'April, 03',
  },
];

const ProjectList: React.FC = () => {
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
              <th className="text-left font-medium py-2 px-2">Member</th>
              <th className="text-left font-medium py-2 px-2">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sampleTasks.map((task, idx) => (
              <tr key={idx} className="border-t last:border-b">
                <td className="py-2 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[task.status]}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-2 px-2 max-w-[180px] truncate">{task.task}</td>
                <td className="py-2 px-2">{task.project}</td>
                <td className="py-2 px-2">{task.member}</td>
                <td className="py-2 px-2">{task.date}</td>
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
