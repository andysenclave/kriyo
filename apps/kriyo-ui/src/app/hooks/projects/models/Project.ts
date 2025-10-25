export interface TaskInfo {
  id: string;
  name: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

export default interface Project {
  id: string;
  owner: UserInfo;

  title: string;
  description: string;

  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  tasks: TaskInfo[];
  targetDate: string | null;
  priority: 'low' | 'medium' | 'high' | null;
  priorityRank: number | null;
  assignedTo: UserInfo | null;
  createdAt: string;
}
