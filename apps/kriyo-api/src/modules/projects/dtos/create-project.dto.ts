class CreateProjectDto {
  title: string;
  owner: string;
  description: string;
  status: string;
  targetDate?: string;
  priority?: string;
  priorityRank?: number;
  assignedTo?: string;
}

export default CreateProjectDto;
