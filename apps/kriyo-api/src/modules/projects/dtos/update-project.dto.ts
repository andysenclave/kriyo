class UpdateProjectDto {
  title?: string;
  description?: string;
  status?: string;
  targetDate?: string;
  priority?: string;
  priorityRank?: number;
  assignedTo?: string;
  tasks?: string[];
}

export default UpdateProjectDto;
