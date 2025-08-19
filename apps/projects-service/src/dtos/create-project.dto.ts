import { IsString, MinLength, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateProjectDto {
  @ApiProperty({ example: 'cmefpqwsq0000p6a9vcauirbt' })
  @IsString()
  owner: string;

  @ApiProperty({ example: 'Example Project Title' })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({ example: 'Example Project Description' })
  @IsString()
  @MinLength(2)
  description: string;

  @ApiProperty({
    example: 'Tue Aug 19 2025 21:20:54 GMT+0530 (India Standard Time)',
  })
  @IsString()
  @Optional()
  targetDate?: string;

  @ApiProperty({
    example: 'pending',
    enum: ['todo', 'in-progress', 'in-review', 'done', 'blocked', 'cancelled'],
  })
  @IsString()
  @IsIn(['todo', 'in-progress', 'in-review', 'done', 'blocked', 'cancelled'])
  status: string;

  @ApiProperty({
    example: 'low',
    enum: ['low', 'medium', 'high'],
  })
  @IsString()
  @IsIn(['low', 'medium', 'high'])
  @Optional()
  priority?: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  priorityRank?: number;

  @ApiProperty({
    example: ['asjkadlbf3245jb2345jkb2'],
    description: 'Task Ids',
  })
  @Optional()
  @IsString({ each: true })
  tasks?: string[];

  @ApiProperty({ example: 'cmefpqwsq0000p6a9vcauirbt' })
  @Optional()
  @IsString()
  assignedTo?: string;
}
