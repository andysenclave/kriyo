/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/unbound-method */
// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { HttpClientService } from '../../services/http-client.service';
import { CacheService } from '../../services/cache.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Task, Project } from '../../models';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpClientService: HttpClientService;

  const mockHttpClientService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
    keys: jest.fn(),
    generateCacheKey: jest.fn(
      (prefix, ...args) => `${prefix}:${args.join(':')}`,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    httpClientService = module.get<HttpClientService>(HttpClientService);

    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockCacheService.get.mockResolvedValue(undefined);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardTasks', () => {
    const userId = 'user-123';
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        priorityRank: 1,
        status: 'todo',
        priority: 'high',
        createdBy: userId,
        assignedTo: '',
        project: '',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday (overdue)
        priorityRank: 2,
        status: 'todo',
        priority: 'medium',
        createdBy: userId,
        assignedTo: '',
        project: '',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Task 3',
        description: 'Description 3',
        dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
        priorityRank: 1,
        status: 'todo',
        priority: 'high',
        createdBy: userId,
        assignedTo: '',
        project: '',
        createdAt: new Date().toISOString(),
      },
    ];

    it('should fetch dashboard tasks successfully', async () => {
      mockCacheService.get.mockResolvedValue(undefined); // No cached value
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.getDashboardTasks(userId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'tasks',
        `/tasks/user/${userId}`,
      );
      expect(result).toEqual({
        overdue: 1,
        highPriority: 2,
        tasks: expect.any(Array),
      });
      expect(result.tasks).toHaveLength(3);
    });

    it('should sort tasks by priority and due date', async () => {
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.getDashboardTasks(userId);

      expect(result.tasks[0].priorityRank).toBe(1);
      expect(result.tasks[1].priorityRank).toBe(1);
      expect(result.tasks[2].priorityRank).toBe(2);
    });

    it('should limit tasks to 5', async () => {
      const manyTasks = Array.from({ length: 10 }, (_, i) => ({
        id: `task-${i}`,
        title: `Task ${i}`,
        description: `Description ${i}`,
        dueDate: new Date().toISOString(),
        priorityRank: Math.floor(i / 2) + 1,
        status: 'todo' as const,
        priority: 'medium' as const,
        createdBy: userId,
        assignedTo: '',
        project: '',
        createdAt: new Date().toISOString(),
      }));

      mockHttpClientService.get.mockResolvedValue(manyTasks);

      const result = await service.getDashboardTasks(userId);

      expect(result.tasks).toHaveLength(5);
    });

    it('should count overdue tasks correctly', async () => {
      const overdueTasks = mockTasks.filter(
        (task) => new Date(task.dueDate) < new Date(),
      );
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.getDashboardTasks(userId);

      expect(result.overdue).toBe(overdueTasks.length);
    });

    it('should count high priority tasks correctly', async () => {
      const highPriorityTasks = mockTasks.filter(
        (task) => task.priorityRank === 1,
      );
      mockHttpClientService.get.mockResolvedValue(mockTasks);

      const result = await service.getDashboardTasks(userId);

      expect(result.highPriority).toBe(highPriorityTasks.length);
    });

    it('should handle empty tasks array', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.getDashboardTasks(userId);

      expect(result).toEqual({
        overdue: 0,
        highPriority: 0,
        tasks: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.getDashboardTasks(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.getDashboardTasks(userId)).rejects.toThrow(
        'Failed to fetch dashboard tasks',
      );
    });
  });

  describe('getDashboardProjects', () => {
    const userId = 'user-123';
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        description: 'Description 1',
        owner: userId,
        tasks: [],
        status: 'active',
        targetDate: null,
        priority: 'high',
        priorityRank: 1,
        assignedTo: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Project 2',
        description: 'Description 2',
        owner: userId,
        tasks: [],
        status: 'active',
        targetDate: null,
        priority: 'medium',
        priorityRank: 2,
        assignedTo: null,
        createdAt: new Date().toISOString(),
      },
    ];

    it('should fetch dashboard projects successfully', async () => {
      mockHttpClientService.get.mockResolvedValue(mockProjects);

      const result = await service.getDashboardProjects(userId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'projects',
        `/projects/user/${userId}`,
      );
      expect(result).toEqual({
        projects: mockProjects,
      });
    });

    it('should handle empty projects array', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.getDashboardProjects(userId);

      expect(result).toEqual({
        projects: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.getDashboardProjects(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.getDashboardProjects(userId)).rejects.toThrow(
        'Failed to fetch dashboard projects',
      );
    });
  });
});
