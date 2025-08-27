import { Task } from '@/app/hooks/tasks/models';

export default interface GetDashboardTasksResponse {
  overdue: number;
  highPriority: number;
  tasks: Task[];
}
