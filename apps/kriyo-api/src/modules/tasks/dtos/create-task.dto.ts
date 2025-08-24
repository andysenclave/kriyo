import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the Kriyo API',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'Due date for the task in ISO 8601 format',
    example: '2024-12-31T23:59:59Z',
  })
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Current status of the task',
    example: 'in-progress',
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Priority level of the task',
    example: 'high',
    enum: ['low', 'medium', 'high', 'critical'],
  })
  priority?: string;

  @ApiPropertyOptional({
    description: 'Numeric priority ranking for sorting',
    example: 1,
    minimum: 1,
  })
  priorityRank?: number;

  @ApiPropertyOptional({
    description: 'ID of the project this task belongs to',
    example: '60f1b2b3c1d4f1a2b3c4d5e6',
  })
  project?: string;

  @ApiPropertyOptional({
    description: 'ID of the user assigned to this task',
    example: '60f1b2b3c1d4f1a2b3c4d5e7',
  })
  assignedTo?: string;
}
