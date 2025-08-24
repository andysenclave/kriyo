/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { HttpClientService } from '../../services/http-client.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { Project } from '../../models';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpClientService: HttpClientService;

  const mockHttpClientService = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  const mockProject: Project = {
    id: 'project-123',
    title: 'Test Project',
    description: 'Test project description',
    owner: 'user-123',
    tasks: [],
    priority: 'high',
    priorityRank: 1,
    createdAt: new Date().toISOString(),
    status: '',
    targetDate: null,
    assignedTo: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
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

  describe('getProjectsByUserId', () => {
    const userId = 'user-123';

    it('should fetch projects for user successfully', async () => {
      const mockProjects = [mockProject];
      mockHttpClientService.get.mockResolvedValue(mockProjects);

      const result = await service.getProjectsByUserId(userId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'projects',
        `/projects/user/${userId}`,
      );
      expect(result).toEqual({
        projects: mockProjects,
      });
    });

    it('should log fetch operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.get.mockResolvedValue([mockProject]);

      await service.getProjectsByUserId(userId);

      expect(logSpy).toHaveBeenCalledWith(
        `Fetching projects for user ${userId}`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Fetched projects for user ${userId}`,
      );
    });

    it('should handle empty projects array', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.getProjectsByUserId(userId);

      expect(result).toEqual({
        projects: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.getProjectsByUserId(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.getProjectsByUserId(userId)).rejects.toThrow(
        `Failed to fetch projects for user ${userId}`,
      );
    });

    it('should log error when http service fails', async () => {
      const errorSpy = jest.spyOn(Logger.prototype, 'error');
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      try {
        await service.getProjectsByUserId(userId);
      } catch (e) {
        throw new Error(e.message);
      }

      expect(errorSpy).toHaveBeenCalledWith(
        `Failed to fetch projects for user ${userId} from core service`,
        error.stack,
      );
    });
  });

  describe('createProject', () => {
    const userId = 'user-123';
    const createProjectDto: CreateProjectDto = {
      title: 'New Project',
      owner: 'user-123',
      description: 'New project description',
      status: 'active',
      priority: 'high',
      priorityRank: 1,
    };

    it('should create project successfully', async () => {
      const expectedProjectDto = {
        ...createProjectDto,
        owner: userId,
      };

      mockHttpClientService.post.mockResolvedValue(mockProject);

      const result = await service.createProject(userId, createProjectDto);

      expect(httpClientService.post).toHaveBeenCalledWith(
        'projects',
        '/projects',
        expectedProjectDto,
      );
      expect(result).toEqual({
        project: mockProject,
      });
    });

    it('should log create operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.post.mockResolvedValue(mockProject);

      await service.createProject(userId, createProjectDto);

      expect(logSpy).toHaveBeenCalledWith(
        `Creating new project for user ${userId} with content ${JSON.stringify({
          ...createProjectDto,
          owner: userId,
        })}`,
      );
      expect(logSpy).toHaveBeenCalledWith(`Created project for user ${userId}`);
    });

    it('should override owner field with userId', async () => {
      const createProjectDtoWithDifferentOwner = {
        ...createProjectDto,
        owner: 'different-user-id',
      };

      mockHttpClientService.post.mockResolvedValue(mockProject);

      await service.createProject(userId, createProjectDtoWithDifferentOwner);

      expect(httpClientService.post).toHaveBeenCalledWith(
        'projects',
        '/projects',
        expect.objectContaining({ owner: userId }),
      );
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.post.mockRejectedValue(error);

      await expect(
        service.createProject(userId, createProjectDto),
      ).rejects.toThrow(InternalServerErrorException);
      await expect(
        service.createProject(userId, createProjectDto),
      ).rejects.toThrow(`Failed to create project for user ${userId}`);
    });
  });

  describe('updateProject', () => {
    const userId = 'user-123';
    const projectId = 'project-123';
    const updateProjectDto: UpdateProjectDto = {
      title: 'Updated Project',
      description: 'Updated description',
      priority: 'medium',
      priorityRank: 2,
    };

    const updatedProject = {
      ...mockProject,
      ...updateProjectDto,
    };

    it('should update project successfully', async () => {
      mockHttpClientService.put.mockResolvedValue(updatedProject);

      const result = await service.updateProject(
        userId,
        projectId,
        updateProjectDto,
      );

      expect(httpClientService.put).toHaveBeenCalledWith(
        'projects',
        `/projects/${projectId}`,
        updateProjectDto,
      );
      expect(result).toEqual({
        project: updatedProject,
      });
    });

    it('should log update operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.put.mockResolvedValue(updatedProject);

      await service.updateProject(userId, projectId, updateProjectDto);

      expect(logSpy).toHaveBeenCalledWith(
        `Updating project for user ${userId} with content ${JSON.stringify(
          updateProjectDto,
        )}`,
      );
      expect(logSpy).toHaveBeenCalledWith(`Updated project for user ${userId}`);
    });

    it('should handle partial updates', async () => {
      const partialUpdate = { title: 'Only Title Updated' };
      const partiallyUpdatedProject = {
        ...mockProject,
        title: 'Only Title Updated',
      };

      mockHttpClientService.put.mockResolvedValue(partiallyUpdatedProject);

      const result = await service.updateProject(
        userId,
        projectId,
        partialUpdate,
      );

      expect(httpClientService.put).toHaveBeenCalledWith(
        'projects',
        `/projects/${projectId}`,
        partialUpdate,
      );
      expect(result).toEqual({
        project: partiallyUpdatedProject,
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.put.mockRejectedValue(error);

      await expect(
        service.updateProject(userId, projectId, updateProjectDto),
      ).rejects.toThrow(InternalServerErrorException);
      await expect(
        service.updateProject(userId, projectId, updateProjectDto),
      ).rejects.toThrow(`Failed to update project for user ${userId}`);
    });
  });

  describe('deleteProject', () => {
    const userId = 'user-123';
    const projectId = 'project-123';

    it('should delete project successfully', async () => {
      mockHttpClientService.delete.mockResolvedValue(undefined);

      const result = await service.deleteProject(userId, projectId);

      expect(httpClientService.delete).toHaveBeenCalledWith(
        'projects',
        `/projects/${projectId}`,
      );
      expect(result).toEqual({
        success: true,
      });
    });

    it('should log delete operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.delete.mockResolvedValue(undefined);

      await service.deleteProject(userId, projectId);

      expect(logSpy).toHaveBeenCalledWith(
        `Deleting project ${projectId} by user ${userId}`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Deleted project ${projectId} by user ${userId}`,
      );
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.delete.mockRejectedValue(error);

      await expect(service.deleteProject(userId, projectId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.deleteProject(userId, projectId)).rejects.toThrow(
        `Failed to delete project ${projectId} by user ${userId}`,
      );
    });
  });

  describe('searchProjects', () => {
    const searchTerm = 'test search';

    it('should search projects successfully', async () => {
      const mockProjects = [mockProject];
      mockHttpClientService.get.mockResolvedValue(mockProjects);

      const result = await service.searchProjects(searchTerm);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'projects',
        `/projects/search/${searchTerm}`,
      );
      expect(result).toEqual({
        projects: mockProjects,
      });
    });

    it('should log search operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.get.mockResolvedValue([mockProject]);

      await service.searchProjects(searchTerm);

      expect(logSpy).toHaveBeenCalledWith(
        `Searching projects with term "${searchTerm}"`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Fetched projects with term "${searchTerm}"`,
      );
    });

    it('should handle empty search results', async () => {
      mockHttpClientService.get.mockResolvedValue([]);

      const result = await service.searchProjects(searchTerm);

      expect(result).toEqual({
        projects: [],
      });
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.searchProjects(searchTerm)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.searchProjects(searchTerm)).rejects.toThrow(
        `Failed to fetch projects with term "${searchTerm}"`,
      );
    });
  });
});
