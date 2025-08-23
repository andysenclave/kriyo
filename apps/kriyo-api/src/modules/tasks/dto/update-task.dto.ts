export class UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: string;
  priority?: string;
  priorityRank?: number;
  project?: string;
  assignedTo?: string;
}
