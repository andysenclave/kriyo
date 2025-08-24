import { ApiPropertyOptional } from '@nestjs/swagger';

class UpdateProjectDto {
  @ApiPropertyOptional({
    description: 'The title of the project',
    example: 'Kriyo Mobile App Development',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the project',
    example: 'Development of mobile application for Kriyo platform',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Current status of the project',
    example: 'active',
    enum: ['planning', 'active', 'on-hold', 'completed', 'cancelled'],
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Target completion date for the project in ISO 8601 format',
    example: '2024-12-31T23:59:59Z',
  })
  targetDate?: string;

  @ApiPropertyOptional({
    description: 'Priority level of the project',
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
    description: 'ID of the user assigned to this project',
    example: '60f1b2b3c1d4f1a2b3c4d5e7',
  })
  assignedTo?: string;

  @ApiPropertyOptional({
    description: 'Array of task IDs associated with this project',
    example: ['60f1b2b3c1d4f1a2b3c4d5e8', '60f1b2b3c1d4f1a2b3c4d5e9'],
    type: [String],
  })
  tasks?: string[];
}

export default UpdateProjectDto;
