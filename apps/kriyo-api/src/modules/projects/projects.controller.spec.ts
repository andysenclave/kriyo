/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthUser } from '../../auth/user.decorator';
import { CreateProjectDto, UpdateProjectDto } from './dtos';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let projectsService: ProjectsService;

  const mockProjectsService = {
    getProjectsByUserId: jest.fn(),
    createProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
    searchProjects: jest.fn(),
  };

  const mockUser: AuthUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMyProjects', () => {
    it('should call projectsService.getProjectsByUserId with user id', async () => {
      const expectedResult = {
        projects: [
          {
            id: '1',
            name: 'Project 1',
            description: 'Description 1',
            owner: 'user-123',
            tasks: [],
            priority: 'high',
            priorityRank: 1,
            createdAt: new Date().toISOString(),
          },
        ],
      };

      mockProjectsService.getProjectsByUserId.mockResolvedValue(expectedResult);

      const result = await controller.getMyProjects(mockUser);

      expect(projectsService.getProjectsByUserId).toHaveBeenCalledWith(
        'user-123',
      );
      expect(projectsService.getProjectsByUserId).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from projectsService', async () => {
      const error = new Error('Service error');
      mockProjectsService.getProjectsByUserId.mockRejectedValue(error);

      await expect(controller.getMyProjects(mockUser)).rejects.toThrow(
        'Service error',
      );
    });
  });

  describe('createMyProject', () => {
    const createProjectDto: CreateProjectDto = {
      title: 'New Project',
      owner: 'user-123',
      description: 'New project description',
      status: 'active',
      priority: 'high',
      priorityRank: 1,
    };

    it('should call projectsService.createProject with user id and dto', async () => {
      const expectedResult = {
        project: {
          id: '1',
          name: 'New Project',
          description: 'New project description',
          owner: 'user-123',
          tasks: [],
          priority: 'high',
          priorityRank: 1,
          createdAt: new Date().toISOString(),
        },
      };

      mockProjectsService.createProject.mockResolvedValue(expectedResult);

      const result = await controller.createMyProject(
        mockUser,
        createProjectDto,
      );

      expect(projectsService.createProject).toHaveBeenCalledWith(
        'user-123',
        createProjectDto,
      );
      expect(projectsService.createProject).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from projectsService', async () => {
      const error = new Error('Service error');
      mockProjectsService.createProject.mockRejectedValue(error);

      await expect(
        controller.createMyProject(mockUser, createProjectDto),
      ).rejects.toThrow('Service error');
    });
  });

  describe('updateMyProject', () => {
    const projectId = 'project-123';
    const updateProjectDto: UpdateProjectDto = {
      title: 'Updated Project',
      description: 'Updated description',
      priority: 'medium',
      priorityRank: 2,
    };

    it('should call projectsService.updateProject with correct parameters', async () => {
      const expectedResult = {
        project: {
          id: projectId,
          name: 'Updated Project',
          description: 'Updated description',
          owner: 'user-123',
          tasks: [],
          priority: 'medium',
          priorityRank: 2,
          createdAt: new Date().toISOString(),
        },
      };

      mockProjectsService.updateProject.mockResolvedValue(expectedResult);

      const result = await controller.updateMyProject(
        mockUser,
        projectId,
        updateProjectDto,
      );

      expect(projectsService.updateProject).toHaveBeenCalledWith(
        'user-123',
        projectId,
        updateProjectDto,
      );
      expect(projectsService.updateProject).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from projectsService', async () => {
      const error = new Error('Service error');
      mockProjectsService.updateProject.mockRejectedValue(error);

      await expect(
        controller.updateMyProject(mockUser, projectId, updateProjectDto),
      ).rejects.toThrow('Service error');
    });
  });

  describe('deleteMyProject', () => {
    const projectId = 'project-123';

    it('should call projectsService.deleteProject with correct parameters', async () => {
      const expectedResult = {
        success: true,
      };

      mockProjectsService.deleteProject.mockResolvedValue(expectedResult);

      const result = await controller.deleteMyProject(mockUser, projectId);

      expect(projectsService.deleteProject).toHaveBeenCalledWith(
        'user-123',
        projectId,
      );
      expect(projectsService.deleteProject).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from projectsService', async () => {
      const error = new Error('Service error');
      mockProjectsService.deleteProject.mockRejectedValue(error);

      await expect(
        controller.deleteMyProject(mockUser, projectId),
      ).rejects.toThrow('Service error');
    });
  });

  describe('searchProjects', () => {
    const searchTerm = 'test search';

    it('should call projectsService.searchProjects with search term', async () => {
      const expectedResult = {
        projects: [
          {
            id: '1',
            name: 'Test Project',
            description: 'A project for testing',
            owner: 'user-123',
            tasks: [],
            priority: 'medium',
            priorityRank: 2,
            createdAt: new Date().toISOString(),
          },
        ],
      };

      mockProjectsService.searchProjects.mockResolvedValue(expectedResult);

      const result = await controller.searchProjects(searchTerm);

      expect(projectsService.searchProjects).toHaveBeenCalledWith(searchTerm);
      expect(projectsService.searchProjects).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from projectsService', async () => {
      const error = new Error('Service error');
      mockProjectsService.searchProjects.mockRejectedValue(error);

      await expect(controller.searchProjects(searchTerm)).rejects.toThrow(
        'Service error',
      );
    });
  });
});
