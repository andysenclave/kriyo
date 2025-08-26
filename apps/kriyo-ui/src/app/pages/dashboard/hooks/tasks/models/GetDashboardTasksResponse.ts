import Task from './Task';

export default interface GetDashboardTasksResponse {
  overdue: number;
  highPriority: number;
  tasks: Task[];
}
