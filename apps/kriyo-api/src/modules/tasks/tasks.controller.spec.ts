import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthUser } from '../../auth/user.decorator';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: TasksService;

  const mockTasksService = {
    getTasksByUserId: jest.fn(),
    getTasksByUserAndDate: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    searchTasks: jest.fn(),
  };

  const mockUser: AuthUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMyTasks', () => {
    it('should call tasksService.getTasksByUserId with user id', async () => {
      const expectedResult = {
        tasks: [
          {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            dueDate: new Date().toISOString(),
            status: 'todo',
            priority: 'high',
            priorityRank: 1,
            createdBy: 'user-123',
            assignedTo: null,
            project: null,
            createdAt: new Date().toISOString(),
          },
        ],
      };

      mockTasksService.getTasksByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getMyTasks(mockUser);

      expect(tasksService.getTasksByUserId).toHaveBeenCalledWith('user-123');
      expect(tasksService.getTasksByUserId).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from tasksService', async () => {
      const error = new Error('Service error');
      mockTasksService.getTasksByUserId.mockRejectedValue(error);

      await expect(controller.getMyTasks(mockUser)).rejects.toThrow(
        'Service error',
      );
    });
  });

  describe('getMyTasksByDate', () => {
    const dueDate = '2025-01-01T00:00:00.000Z';

    it('should call tasksService.getTasksByUserAndDate with user id and date', async () => {
      const expectedResult = {
        tasks: [
          {
            id: '1',
            title: 'Task due today',
            description: 'Task description',
            dueDate: dueDate,
            status: 'todo',
            priority: 'high',
            priorityRank: 1,
            createdBy: 'user-123',
            assignedTo: null,
            project: null,
            createdAt: new Date().toISOString(),
          },
        ],
      };

      mockTasksService.getTasksByUserAndDate.mockResolvedValue(expectedResult);

      const result = await controller.getMyTasksByDate(mockUser, dueDate);

      expect(tasksService.getTasksByUserAndDate).toHaveBeenCalledWith(
        'user-123',
        dueDate,
      );
      expect(tasksService.getTasksByUserAndDate).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from tasksService', async () => {
      const error = new Error('Service error');
      mockTasksService.getTasksByUserAndDate.mockRejectedValue(error);

      await expect(
        controller.getMyTasksByDate(mockUser, dueDate),
      ).rejects.toThrow('Service error');
    });
  });

  describe('createMyTask', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'New task description',
      dueDate: new Date().toISOString(),
      status: 'todo',
      priority: 'high',
      priorityRank: 1,
    };

    it('should call tasksService.createTask with user id and dto', async () => {
      const expectedResult = {
        task: {
          id: '1',
          title: 'New Task',
          description: 'New task description',
          dueDate: new Date().toISOString(),
          status: 'todo',
          priority: 'high',
          priorityRank: 1,
          createdBy: 'user-123',
          assignedTo: null,
          project: null,
          createdAt: new Date().toISOString(),
        },
      };

      mockTasksService.createTask.mockResolvedValue(expectedResult);

      const result = await controller.createMyTask(mockUser, createTaskDto);

      expect(tasksService.createTask).toHaveBeenCalledWith(
        'user-123',
        createTaskDto,
      );
      expect(tasksService.createTask).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from tasksService', async () => {
      const error = new Error('Service error');
      mockTasksService.createTask.mockRejectedValue(error);

      await expect(
        controller.createMyTask(mockUser, createTaskDto),
      ).rejects.toThrow('Service error');
    });
  });

  describe('updateMyTask', () => {
    const taskId = 'task-123';
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task',
      description: 'Updated description',
      status: 'in-progress',
      priority: 'medium',
      priorityRank: 2,
    };

    it('should call tasksService.updateTask with correct parameters', async () => {
      const expectedResult = {
        task: {
          id: taskId,
          title: 'Updated Task',
          description: 'Updated description',
          dueDate: new Date().toISOString(),
          status: 'in-progress',
          priority: 'medium',
          priorityRank: 2,
          createdBy: 'user-123',
          assignedTo: null,
          project: null,
          createdAt: new Date().toISOString(),
        },
      };

      mockTasksService.updateTask.mockResolvedValue(expectedResult);

      const result = await controller.updateMyTask(
        mockUser,
        taskId,
        updateTaskDto,
      );

      expect(tasksService.updateTask).toHaveBeenCalledWith(
        'user-123',
        taskId,
        updateTaskDto,
      );
      expect(tasksService.updateTask).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from tasksService', async () => {
      const error = new Error('Service error');
      mockTasksService.updateTask.mockRejectedValue(error);

      await expect(
        controller.updateMyTask(mockUser, taskId, updateTaskDto),
      ).rejects.toThrow('Service error');
    });
  });

  describe('deleteMyTask', () => {
    const taskId = 'task-123';

    it('should call tasksService.deleteTask with correct parameters', async () => {
      const expectedResult = {
        success: true,
      };

      mockTasksService.deleteTask.mockResolvedValue(expectedResult);

      const result = await controller.deleteMyTask(mockUser, taskId);

      expect(tasksService.deleteTask).toHaveBeenCalledWith('user-123', taskId);
      expect(tasksService.deleteTask).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from tasksService', async () => {
      const error = new Error('Service error');
      mockTasksService.deleteTask.mockRejectedValue(error);

      await expect(
        controller.deleteMyTask(mockUser, taskId),
      ).rejects.toThrow('Service error');
    });
  });

  describe('searchTasks', () => {
    const searchTerm = 'test search';

    it('should call tasksService.searchTasks with search term', async () => {
      const expectedResult = {
        tasks: [
          {
            id: '1',
            title: 'Test Task',
            description: 'A task for testing',
            dueDate: new Date().toISOString(),
            status: 'todo',
            priority: 'medium',
            priorityRank: 2,
            createdBy: 'user-123',
            assignedTo: null,
            project: null,
            createdAt: new Date().toISOString(),
          },
        ],
      };

      mockTasksService.searchTasks.mockResolvedValue(expectedResult);

      const result = await controller.searchTasks(searchTerm);

      expect(tasksService.searchTasks).toHaveBeenCalledWith(searchTerm);
      expect(tasksService.searchTasks).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from tasksService', async () => {
      const error = new Error('Service error');
      mockTasksService.searchTasks.mockRejectedValue(error);

      await expect(controller.searchTasks(searchTerm)).rejects.toThrow(
        'Service error',
      );
    });
  });
});