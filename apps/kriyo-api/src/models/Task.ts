export default interface Task {
  id: string;
  createdBy: string;

  title: string;
  description: string;

  dueDate: string;
  status: string;
  priority: string;
  priorityRank: number;
  project: string | null;
  assignedTo: string | null;
  createdAt: string;
}
