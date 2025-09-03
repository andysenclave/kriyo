import { UserInfo } from './User';

export default interface Task {
  id: string;
  createdBy: UserInfo;

  title: string;
  description: string;

  dueDate: string;
  status: string;
  priority: string;
  priorityRank: number;
  project: string | null;
  assignedTo: UserInfo | null;
  createdAt: string;
}

export interface FlatTask extends Omit<Task, 'createdBy' | 'assignedTo'> {
  createdBy: string;
  assignedTo: string | null;
}
