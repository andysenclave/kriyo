import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { HttpClientService } from '../../services/http-client.service';
import { Task } from '../../models';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly httpClientService: HttpClientService) {}
  async getTasksById(id: string) {
    try {
      this.logger.log(`Fetching tasks for id ${id}`);

      const task: Task = await this.httpClientService.get(
        'tasks',
        `/tasks/${id}`,
      );

      this.logger.log(`Fetched tasks for id ${id}`);

      return task;
    } catch (error) {
      this.logger.error(
        `Failed to fetch task detail for ${id} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch task detail for task ${id}`,
      );
    }
  }
  async getTasksByUserId(userId: string) {
    try {
      this.logger.log(`Fetching tasks for user ${userId}`);

      const tasks: Task[] = await this.httpClientService.get(
        'tasks',
        `/tasks/user/${userId}`,
      );

      this.logger.log(`Fetched tasks for user ${userId}`);

      return {
        tasks,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch tasks for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to fetch tasks`);
    }
  }

  async getTasksByUserAndDate(userId: string, dueDate: string) {
    try {
      this.logger.log(
        `Fetching tasks for user ${userId} with due date ${dueDate}`,
      );

      const tasks: Task[] = await this.httpClientService.get(
        'tasks',
        `/tasks/user/${userId}/${dueDate}`,
      );

      this.logger.log(
        `Fetched tasks for user ${userId} with due date ${dueDate}`,
      );

      return {
        tasks,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch tasks for user ${userId} with due date ${dueDate} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to fetch tasks for user`);
    }
  }

  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    try {
      const taskDto = {
        ...createTaskDto,
        createdBy: userId,
      } as Task;

      this.logger.log(
        `Creating new task for user ${userId} with content ${JSON.stringify(taskDto)}`,
      );

      const task: Task = await this.httpClientService.post(
        'tasks',
        `/tasks`,
        taskDto,
      );

      this.logger.log(`Created task for user ${userId}`);

      return {
        task,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create task for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to create task for user`);
    }
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    try {
      this.logger.log(
        `Updating task for user ${userId} with content ${JSON.stringify(updateTaskDto)}`,
      );

      const task: Task = await this.httpClientService.put(
        'tasks',
        `/tasks/${taskId}`,
        updateTaskDto,
      );

      this.logger.log(`Updated task for user ${userId}`);

      return {
        task,
      };
    } catch (error) {
      this.logger.error(
        `Failed to update task for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(`Failed to update task for user`);
    }
  }

  async deleteTask(userId: string, taskId: string) {
    try {
      this.logger.log(`Deleting task ${taskId} by user ${userId}`);

      await this.httpClientService.delete('tasks', `/tasks/${taskId}`);

      this.logger.log(`Deleted task ${taskId} by user ${userId}`);

      return {
        success: true,
      };
    } catch (error) {
      this.logger.error(
        `Failed to delete task ${taskId} by user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to delete task ${taskId} by user`,
      );
    }
  }

  async searchTasks(searchTerm: string) {
    try {
      this.logger.log(`Searching tasks with term "${searchTerm}"`);

      const tasks: Task[] = await this.httpClientService.get(
        'tasks',
        `/tasks/search/${searchTerm}`,
      );

      this.logger.log(`Fetched tasks with term "${searchTerm}"`);

      return {
        tasks,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch tasks with term "${searchTerm}" from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch tasks with term "${searchTerm}"`,
      );
    }
  }
}
