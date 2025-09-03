import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { HttpClientService } from '../../services/http-client.service';
import { FlatTask, Task, UserInfo } from '../../models';
import { UserSyncService } from '../user-sync/user-sync.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly userSyncService: UserSyncService,
  ) {}

  private getUserById = async (
    userId: string,
  ): Promise<UserInfo | undefined> => {
    this.logger.log(`Fetching user info for user ID ${userId}`);
    return await this.userSyncService.getUserById(userId);
  };

  private getAllRelatedUserIdsInTask = (task: FlatTask): string[] => {
    const userIds = [task.createdBy, task?.assignedTo] as string[];
    this.logger.log(
      `Fetching related user IDs ${userIds.join(', ')} for task ${task.id}`,
    );
    return [...new Set([...userIds])];
  };

  private async updateUserInfoInTasks(tasks: FlatTask[]): Promise<Task[]> {
    const accumulatedUserIds = new Set<string>();

    tasks.forEach((task) => {
      this.getAllRelatedUserIdsInTask(task).forEach((userId) =>
        accumulatedUserIds.add(userId),
      );
    });

    this.logger.log(
      `Related user IDs for tasks(${tasks.length}): ${Array.from(accumulatedUserIds).join(', ')}`,
    );

    const accumulatedUserInfos = await Promise.all(
      Array.from(accumulatedUserIds).map((userId) => this.getUserById(userId)),
    );

    this.logger.log(
      `Related user infos fetched successfully accumulatedUserInfos: ${JSON.stringify(accumulatedUserInfos)}`,
    );

    return tasks.map((task) => {
      const createdBy = accumulatedUserInfos.find(
        (userInfo) => userInfo?.betterAuthId === task.createdBy,
      ) as UserInfo;
      const assignedTo =
        accumulatedUserInfos.find(
          (userInfo) => userInfo?.betterAuthId === task.assignedTo,
        ) || null;

      this.logger.log(
        `User infos updated for task ${JSON.stringify(task)}, createdBy: ${JSON.stringify(createdBy)}, assignedTo: ${JSON.stringify(assignedTo)}`,
      );

      return {
        ...task,
        createdBy,
        assignedTo,
      };
    });
  }
  async getTaskById(id: string) {
    try {
      this.logger.log(`Fetching tasks for id ${id}`);

      const task: FlatTask = await this.httpClientService.get(
        'tasks',
        `/tasks/${id}`,
      );

      this.logger.log(`Fetched tasks for id ${id}`);
      this.logger.log(`Fetching user details for tasks with task id ${id}`);

      const updatedTask = await this.updateUserInfoInTasks([task]);

      this.logger.log(
        `Fetched user details for tasks with task id ${id}, taskDetail: ${JSON.stringify(updatedTask[0])}`,
      );

      return updatedTask[0];
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

      const tasks: FlatTask[] = await this.httpClientService.get(
        'tasks',
        `/tasks/user/${userId}`,
      );

      this.logger.log(`Fetched tasks for user ${userId}`);
      this.logger.log(
        `Fetching user details for tasks with task ids ${tasks.map((task) => task.id).join(', ')}`,
      );

      const updatedTasks = await this.updateUserInfoInTasks(tasks);

      this.logger.log(`Fetched tasks for user ${userId}`);

      return {
        tasks: updatedTasks,
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

      const tasks: FlatTask[] = await this.httpClientService.get(
        'tasks',
        `/tasks/user/${userId}/${dueDate}`,
      );

      this.logger.log(
        `Fetched tasks for user ${userId} with due date ${dueDate}`,
      );
      this.logger.log(
        `Fetching user details for tasks with task ids ${tasks.map((task) => task.id).join(', ')}`,
      );

      const updatedTasks = await this.updateUserInfoInTasks(tasks);

      return {
        tasks: updatedTasks,
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
      } as Partial<CreateTaskDto>;

      this.logger.log(
        `Creating new task for user ${userId} with content ${JSON.stringify(taskDto)}`,
      );

      const task: FlatTask = await this.httpClientService.post(
        'tasks',
        `/tasks`,
        taskDto,
      );

      this.logger.log(`Created task for user ${userId}`);
      this.logger.log(`Fetching user details with task id ${task.id}`);

      const updatedTask = await this.updateUserInfoInTasks([task]);

      this.logger.log(
        `Fetched user details for tasks with task id ${task.id}, taskDetail: ${JSON.stringify(updatedTask[0])}`,
      );

      return {
        task: updatedTask[0],
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

      const task: FlatTask = await this.httpClientService.put(
        'tasks',
        `/tasks/${taskId}`,
        updateTaskDto,
      );

      this.logger.log(`Updated task for user ${userId}`);
      this.logger.log(`Fetching user details with task id ${task.id}`);

      const updatedTask = await this.updateUserInfoInTasks([task]);

      this.logger.log(
        `Fetched user details for tasks with task id ${task.id}, taskDetail: ${JSON.stringify(updatedTask[0])}`,
      );

      return {
        task: updatedTask[0],
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

      const tasks: FlatTask[] = await this.httpClientService.get(
        'tasks',
        `/tasks/search/${searchTerm}`,
      );

      this.logger.log(`Fetched tasks with term "${searchTerm}"`);
      this.logger.log(
        `Fetching user details for tasks with task ids ${tasks.map((task) => task.id).join(', ')}`,
      );

      const updatedTasks = await this.updateUserInfoInTasks(tasks);

      return {
        tasks: updatedTasks,
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
