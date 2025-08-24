/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthUser } from '../../auth/user.decorator';

describe('DashboardController', () => {
  let controller: DashboardController;
  let dashboardService: DashboardService;

  const mockDashboardService = {
    getDashboardTasks: jest.fn(),
    getDashboardProjects: jest.fn(),
  };

  const mockUser: AuthUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    dashboardService = module.get<DashboardService>(DashboardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDashboardTasks', () => {
    it('should call dashboardService.getDashboardTasks with user id', async () => {
      const expectedResult = {
        overdue: 2,
        highPriority: 3,
        tasks: [],
      };

      mockDashboardService.getDashboardTasks.mockResolvedValue(expectedResult);

      const result = await controller.getDashboardTasks(mockUser);

      expect(dashboardService.getDashboardTasks).toHaveBeenCalledWith(
        'user-123',
      );
      expect(dashboardService.getDashboardTasks).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from dashboardService', async () => {
      const error = new Error('Service error');
      mockDashboardService.getDashboardTasks.mockRejectedValue(error);

      await expect(controller.getDashboardTasks(mockUser)).rejects.toThrow(
        'Service error',
      );
    });
  });

  describe('getDashboardProjects', () => {
    it('should call dashboardService.getDashboardProjects with user id', async () => {
      const expectedResult = {
        projects: [],
      };

      mockDashboardService.getDashboardProjects.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.getDashboardProjects(mockUser);

      expect(dashboardService.getDashboardProjects).toHaveBeenCalledWith(
        'user-123',
      );
      expect(dashboardService.getDashboardProjects).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from dashboardService', async () => {
      const error = new Error('Service error');
      mockDashboardService.getDashboardProjects.mockRejectedValue(error);

      await expect(controller.getDashboardProjects(mockUser)).rejects.toThrow(
        'Service error',
      );
    });
  });
});
