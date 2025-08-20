export class CreateProjectDto {
  title: string;
  description: string;
  status: string;
  targetDate?: string;
  priority?: string;
  priorityRank?: number;
  assignedTo?: string;
}