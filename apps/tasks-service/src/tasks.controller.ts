import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from 'generated/prisma';
import { CreateTaskDto } from './dtos';
import { Logger } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskModel | null> {
    return await this.tasksService.findTask({ id });
  }

  @Get('/user/:userId')
  async getTasksByUserId(
    @Param('userId') userId: string,
  ): Promise<TaskModel[]> {
    this.logger.log(`Fetching tasks for user ${userId}`);
    return await this.tasksService.getAllTasks({
      where: {
        OR: [{ createdBy: userId }, { assignedTo: userId }],
      },
    });
  }

  @Get('/user/:userId/:dueDate')
  async getUserTasksForDueDate(
    @Param('userId') userId: string,
    @Param('dueDate') dueDate: string,
  ): Promise<TaskModel[]> {
    this.logger.log(
      `Fetching tasks for user ${userId} with due date ${dueDate}`,
    );

    const targetDate = new Date(dueDate);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const targetDay = targetDate.getDate();

    const allTasks = await this.tasksService.getAllTasks({
      where: {
        OR: [{ createdBy: userId }, { assignedTo: userId }],
      },
    });

    return allTasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getFullYear() === targetYear &&
        taskDate.getMonth() === targetMonth &&
        taskDate.getDate() === targetDay
      );
    });
  }

  @Get('/search/:searchTerm')
  async searchTasks(
    @Param('searchTerm') searchTerm: string,
  ): Promise<TaskModel[]> {
    this.logger.log(`Searching my tasks with term "${searchTerm}"`);

    return await this.tasksService.getAllTasks({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  @Get('/')
  async getAllTasks(): Promise<TaskModel[]> {
    this.logger.log('Fetching all tasks');
    return this.tasksService.getAllTasks({
      skip: 0,
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('/')
  async createTask(
    @Body()
    taskData: CreateTaskDto,
  ): Promise<TaskModel> {
    return this.tasksService.createTask(taskData);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: Partial<TaskModel>,
  ): Promise<TaskModel> {
    return await this.tasksService.updateTask({
      where: { id },
      data: taskData,
    });
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<TaskModel> {
    return await this.tasksService.deleteTask({ id });
  }
}
