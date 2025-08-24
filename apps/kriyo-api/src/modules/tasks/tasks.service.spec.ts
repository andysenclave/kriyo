import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { HttpClientService } from '../../services/http-client.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { Task } from '../../models';

describe('TasksService', () => {
  let service: TasksService;
  let httpClientService: HttpClientService;

  const mockHttpClientService = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  const mockTask: Task = {
    id: 'task-123',
    title: 'Test Task',
    description: 'Test task description',
    dueDate: new Date().toISOString(),
    status: 'todo',
    priority: 'high',
    priorityRank: 1,
    createdBy: 'user-123',
    assignedTo: null,
    project: null,
    createdAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    httpClientService = module.get<HttpClientService>(HttpClientService);

    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasksByUserId', () => {
    const userId = 'user-123';

    it('should fetch tasks for user successfully', async () => {
      const mockTasks = [mockTask];
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.getTasksByUserId(userId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'tasks',
        `/tasks/user/${userId}`,
      );
      expect(result).toEqual({
        tasks: mockTasks,
      });
    });

    it('should log fetch operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.get.mockResolvedValue([mockTask]);

      await service.getTasksByUserId(userId);

      expect(logSpy).toHaveBeenCalledWith(`Fetching tasks for user ${userId}`);
      expect(logSpy).toHaveBeenCalledWith(`Fetched tasks for user ${userId}`);
    });

    it('should handle empty tasks array', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.getTasksByUserId(userId);

      expect(result).toEqual({
        tasks: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.getTasksByUserId(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.getTasksByUserId(userId)).rejects.toThrow(
        `Failed to fetch tasks for user ${userId}`,
      );
    });

    it('should log error when http service fails', async () => {
      const errorSpy = jest.spyOn(Logger.prototype, 'error');
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      try {
        await service.getTasksByUserId(userId);
      } catch (e) {
        // Expected to throw
      }

      expect(errorSpy).toHaveBeenCalledWith(
        `Failed to fetch tasks for user ${userId} from core service`,
        error.stack,
      );
    });
  });

  describe('getTasksByUserAndDate', () => {
    const userId = 'user-123';
    const dueDate = '2025-01-01T00:00:00.000Z';

    it('should fetch tasks by user and date successfully', async () => {
      const mockTasks = [mockTask];
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.getTasksByUserAndDate(userId, dueDate);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'tasks',
        `/tasks/user/${userId}/${dueDate}`,
      );
      expect(result).toEqual({
        tasks: mockTasks,
      });
    });

    it('should log fetch operation with date', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.get.mockResolvedValue([mockTask]);

      await service.getTasksByUserAndDate(userId, dueDate);

      expect(logSpy).toHaveBeenCalledWith(
        `Fetching tasks for user ${userId} with due date ${dueDate}`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Fetched tasks for user ${userId} with due date ${dueDate}`,
      );
    });

    it('should handle empty tasks array for date', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.getTasksByUserAndDate(userId, dueDate);

      expect(result).toEqual({
        tasks: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(
        service.getTasksByUserAndDate(userId, dueDate),
      ).rejects.toThrow(InternalServerErrorException);
      await expect(
        service.getTasksByUserAndDate(userId, dueDate),
      ).rejects.toThrow(
        `Failed to fetch tasks for user ${userId} with due date ${dueDate}`,
      );
    });
  });

  describe('createTask', () => {
    const userId = 'user-123';
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'New task description',
      dueDate: new Date().toISOString(),
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
    };

    it('should create task successfully', async () => {
      const expectedTaskDto = {
        ...createTaskDto,
        createdBy: userId,
      };

      mockHttpClientService.post.mockResolvedValue(mockTask);

      const result = await service.createTask(userId, createTaskDto);

      expect(httpClientService.post).toHaveBeenCalledWith(
        'tasks',
        '/tasks',
        expectedTaskDto,
      );
      expect(result).toEqual({
        task: mockTask,
      });
    });

    it('should log create operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.post.mockResolvedValue(mockTask);

      await service.createTask(userId, createTaskDto);

      expect(logSpy).toHaveBeenCalledWith(
        `Creating new task for user ${userId} with content ${JSON.stringify({
          ...createTaskDto,
          createdBy: userId,
        })}`,
      );
      expect(logSpy).toHaveBeenCalledWith(`Created task for user ${userId}`);
    });

    it('should set createdBy field to userId', async () => {
      mockHttpClientService.post.mockResolvedValue(mockTask);

      await service.createTask(userId, createTaskDto);

      expect(httpClientService.post).toHaveBeenCalledWith(
        'tasks',
        '/tasks',
        expect.objectContaining({ createdBy: userId }),
      );
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.post.mockRejectedValue(error);

      await expect(service.createTask(userId, createTaskDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.createTask(userId, createTaskDto)).rejects.toThrow(
        `Failed to create task for user ${userId}`,
      );
    });
  });

  describe('updateTask', () => {
    const userId = 'user-123';
    const taskId = 'task-123';
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
      status: 'in-progress',
      priority: 'medium',
      priorityRank: 2,
    };

    const updatedTask = {
      ...mockTask,
      ...updateTaskDto,
    };

    it('should update task successfully', async () => {
      mockHttpClientService.put.mockResolvedValue(updatedTask);

      const result = await service.updateTask(userId, taskId, updateTaskDto);

      expect(httpClientService.put).toHaveBeenCalledWith(
        'tasks',
        `/tasks/${taskId}`,
        updateTaskDto,
      );
      expect(result).toEqual({
        task: updatedTask,
      });
    });

    it('should log update operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.put.mockResolvedValue(updatedTask);

      await service.updateTask(userId, taskId, updateTaskDto);

      expect(logSpy).toHaveBeenCalledWith(
        `Updating task for user ${userId} with content ${JSON.stringify(
          updateTaskDto,
        )}`,
      );
      expect(logSpy).toHaveBeenCalledWith(`Updated task for user ${userId}`);
    });

    it('should handle partial updates', async () => {
      const partialUpdate = { title: 'Only Title Updated' };
      const partiallyUpdatedTask = {
        ...mockTask,
        title: 'Only Title Updated',
      };

      mockHttpClientService.put.mockResolvedValue(partiallyUpdatedTask);

      const result = await service.updateTask(userId, taskId, partialUpdate);

      expect(httpClientService.put).toHaveBeenCalledWith(
        'tasks',
        `/tasks/${taskId}`,
        partialUpdate,
      );
      expect(result).toEqual({
        task: partiallyUpdatedTask,
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.put.mockRejectedValue(error);

      await expect(
        service.updateTask(userId, taskId, updateTaskDto),
      ).rejects.toThrow(InternalServerErrorException);
      await expect(
        service.updateTask(userId, taskId, updateTaskDto),
      ).rejects.toThrow(`Failed to update task for user ${userId}`);
    });
  });

  describe('deleteTask', () => {
    const userId = 'user-123';
    const taskId = 'task-123';

    it('should delete task successfully', async () => {
      mockHttpClientService.delete.mockResolvedValue(undefined);

      const result = await service.deleteTask(userId, taskId);

      expect(httpClientService.delete).toHaveBeenCalledWith(
        'tasks',
        `/tasks/${taskId}`,
      );
      expect(result).toEqual({
        success: true,
      });
    });

    it('should log delete operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.delete.mockResolvedValue(undefined);

      await service.deleteTask(userId, taskId);

      expect(logSpy).toHaveBeenCalledWith(
        `Deleting task ${taskId} by user ${userId}`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Deleted task ${taskId} by user ${userId}`,
      );
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.delete.mockRejectedValue(error);

      await expect(service.deleteTask(userId, taskId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.deleteTask(userId, taskId)).rejects.toThrow(
        `Failed to delete task ${taskId} by user ${userId}`,
      );
    });
  });

  describe('searchTasks', () => {
    const searchTerm = 'test search';

    it('should search tasks successfully', async () => {
      const mockTasks = [mockTask];
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.searchTasks(searchTerm);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'tasks',
        `/tasks/search/${searchTerm}`,
      );
      expect(result).toEqual({
        tasks: mockTasks,
      });
    });

    it('should log search operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.get.mockResolvedValue([mockTask]);

      await service.searchTasks(searchTerm);

      expect(logSpy).toHaveBeenCalledWith(
        `Searching tasks with term "${searchTerm}"`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Fetched tasks with term "${searchTerm}"`,
      );
    });

    it('should handle empty search results', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.searchTasks(searchTerm);

      expect(result).toEqual({
        tasks: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.searchTasks(searchTerm)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.searchTasks(searchTerm)).rejects.toThrow(
        `Failed to fetch tasks with term "${searchTerm}"`,
      );
    });
  });
});