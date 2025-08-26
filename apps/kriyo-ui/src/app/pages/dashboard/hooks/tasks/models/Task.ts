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
  title: string;
  description?: string;
  dueDate?: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked' | 'cancelled';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  createdBy: UserInfo;
  project?: string;
}
