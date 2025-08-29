export default interface Project {
  id?: string;
  owner: string;
  title: string;
  description: string;
  status: string;
  tasks: string[];
  targetDate: string | null;
  priority: string | null;
  priorityRank: number | null;
  assignedTo: string | null;
  createdAt: string;
}
