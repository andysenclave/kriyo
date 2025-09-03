export interface ProjectInfo {
  id: string;
  name: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

export default interface Task {
  id: string;
  createdBy: UserInfo;

  title: string;
  description: string;

  dueDate: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  priorityRank: number;
  project: string | null;
  assignedTo: UserInfo | null;
  createdAt: string;
}
