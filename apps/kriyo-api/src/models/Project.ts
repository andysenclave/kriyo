import { UserInfo } from './User';

export default interface Project {
  id: string;
  owner: UserInfo;
  title: string;
  description: string;
  status: string;
  tasks: string[];
  targetDate: string | null;
  priority: string | null;
  priorityRank: number | null;
  assignedTo: UserInfo | null;
  createdAt: string;
}

export interface FlatProject extends Omit<Project, 'owner' | 'assignedTo'> {
  owner: string;
  assignedTo: string | null;
}
