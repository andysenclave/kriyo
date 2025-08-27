import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

@ApiTags('Tasks')
@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('my/tasks')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get user tasks',
    description: 'Retrieve all tasks belonging to the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user tasks retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
          title: { type: 'string', example: 'Complete project documentation' },
          description: {
            type: 'string',
            example: 'Write comprehensive documentation for the Kriyo API',
          },
          dueDate: {
            type: 'string',
            example: '2024-12-31T23:59:59Z',
            nullable: true,
          },
          status: { type: 'string', example: 'in-progress' },
          priority: { type: 'string', example: 'high' },
          priorityRank: { type: 'number', example: 1 },
          project: {
            type: 'string',
            example: '60f1b2b3c1d4f1a2b3c4d5e7',
            nullable: true,
          },
          assignedTo: {
            type: 'string',
            example: '60f1b2b3c1d4f1a2b3c4d5e8',
            nullable: true,
          },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
          updatedAt: { type: 'string', example: '2024-01-01T12:00:00Z' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async getMyTasks(@CurrentUser() user: AuthUser) {
    return this.tasksService.getTasksByUserId(user.id);
  }

  @Get('my/tasks/dueDate/:dueDate')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Get user tasks by due date',
    description:
      'Retrieve tasks belonging to the authenticated user filtered by due date',
  })
  @ApiParam({
    name: 'dueDate',
    description: 'Due date to filter tasks by (ISO 8601 format)',
    example: '2024-12-31',
  })
  @ApiResponse({
    status: 200,
    description:
      'List of user tasks for the specified date retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async getMyTasksByDate(
    @CurrentUser() user: AuthUser,
    @Param('dueDate') dueDate: string,
  ) {
    return this.tasksService.getTasksByUserAndDate(user.id, dueDate);
  }

  @Post('my/tasks')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Create a new task for the authenticated user',
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
        title: { type: 'string', example: 'Complete project documentation' },
        description: {
          type: 'string',
          example: 'Write comprehensive documentation for the Kriyo API',
        },
        dueDate: {
          type: 'string',
          example: '2024-12-31T23:59:59Z',
          nullable: true,
        },
        status: { type: 'string', example: 'pending' },
        priority: { type: 'string', example: 'high' },
        priorityRank: { type: 'number', example: 1 },
        project: {
          type: 'string',
          example: '60f1b2b3c1d4f1a2b3c4d5e7',
          nullable: true,
        },
        assignedTo: {
          type: 'string',
          example: '60f1b2b3c1d4f1a2b3c4d5e8',
          nullable: true,
        },
        userId: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e9' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
        updatedAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid task data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async createMyTask(
    @CurrentUser() user: AuthUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(user.id, createTaskDto);
  }

  @Put('my/tasks/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Update an existing task belonging to the authenticated user',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID to update',
    example: '60f1b2b3c1d4f1a2b3c4d5e6',
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid task data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Task not found or does not belong to user',
  })
  async updateMyTask(
    @CurrentUser() user: AuthUser,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(user.id, taskId, updateTaskDto);
  }

  @Delete('my/tasks/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Delete an existing task belonging to the authenticated user',
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID to delete',
    example: '60f1b2b3c1d4f1a2b3c4d5e6',
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Task deleted successfully' },
        deletedTaskId: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Task not found or does not belong to user',
  })
  async deleteMyTask(
    @CurrentUser() user: AuthUser,
    @Param('id') taskId: string,
  ) {
    return this.tasksService.deleteTask(user.id, taskId);
  }

  @Get('protected/tasks/search/:search')
  @Version('1')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Search tasks',
    description: 'Search for tasks by title or description across all users',
  })
  @ApiParam({
    name: 'search',
    description: 'Search term to find tasks',
    example: 'documentation',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e6' },
          title: { type: 'string', example: 'Complete project documentation' },
          description: {
            type: 'string',
            example: 'Write comprehensive documentation for the Kriyo API',
          },
          dueDate: {
            type: 'string',
            example: '2024-12-31T23:59:59Z',
            nullable: true,
          },
          status: { type: 'string', example: 'in-progress' },
          priority: { type: 'string', example: 'high' },
          priorityRank: { type: 'number', example: 1 },
          project: {
            type: 'string',
            example: '60f1b2b3c1d4f1a2b3c4d5e7',
            nullable: true,
          },
          assignedTo: {
            type: 'string',
            example: '60f1b2b3c1d4f1a2b3c4d5e8',
            nullable: true,
          },
          userId: { type: 'string', example: '60f1b2b3c1d4f1a2b3c4d5e9' },
          createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
          updatedAt: { type: 'string', example: '2024-01-01T12:00:00Z' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required',
  })
  async searchTasks(@Param('search') searchTerm: string) {
    return this.tasksService.searchTasks(searchTerm);
  }
}
