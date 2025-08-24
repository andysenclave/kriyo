import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { HttpClientService } from '../../services/http-client.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../../models';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpClientService: HttpClientService;

  const mockHttpClientService = {
    get: jest.fn(),
    put: jest.fn(),
  };

  const mockUser: User = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    phone: '1234567890',
    betterAuthId: 'auth-123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
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

  describe('getProfile', () => {
    const userId = 'user-123';

    it('should fetch user profile successfully', async () => {
      mockHttpClientService.get.mockResolvedValue(mockUser);

      const result = await service.getProfile(userId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'user',
        `/users/${userId}`,
      );
      expect(result).toEqual({
        user: mockUser,
      });
    });

    it('should log fetch operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.get.mockResolvedValue(mockUser);

      await service.getProfile(userId);

      expect(logSpy).toHaveBeenCalledWith(
        `Fetching profile information for user ${userId}`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Fetched user information for user ${userId}`,
      );
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      await expect(service.getProfile(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.getProfile(userId)).rejects.toThrow(
        'Failed to fetch user information',
      );
    });

    it('should log error when http service fails', async () => {
      const errorSpy = jest.spyOn(Logger.prototype, 'error');
      const error = new Error('HTTP error');
      mockHttpClientService.get.mockRejectedValue(error);

      try {
        await service.getProfile(userId);
      } catch (e) {
        // Expected to throw
      }

      expect(errorSpy).toHaveBeenCalledWith(
        `Failed to fetch user information for user ${userId} from core service`,
        error.stack,
      );
    });
  });

  describe('updateProfile', () => {
    const userId = 'user-123';
    const updateProfileDto = {
      name: 'Updated Name',
      phone: '9876543210',
    };

    const updatedUser = {
      ...mockUser,
      ...updateProfileDto,
      updatedAt: new Date().toISOString(),
    };

    it('should update user profile successfully', async () => {
      mockHttpClientService.put.mockResolvedValue(updatedUser);

      const result = await service.updateProfile(userId, updateProfileDto);

      expect(httpClientService.put).toHaveBeenCalledWith(
        'user',
        `/users/${userId}`,
        updateProfileDto,
      );
      expect(result).toEqual({
        user: updatedUser,
      });
    });

    it('should handle partial updates', async () => {
      const partialUpdate = { name: 'Only Name Updated' };
      const partiallyUpdatedUser = {
        ...mockUser,
        name: 'Only Name Updated',
        updatedAt: new Date().toISOString(),
      };

      mockHttpClientService.put.mockResolvedValue(partiallyUpdatedUser);

      const result = await service.updateProfile(userId, partialUpdate);

      expect(httpClientService.put).toHaveBeenCalledWith(
        'user',
        `/users/${userId}`,
        partialUpdate,
      );
      expect(result).toEqual({
        user: partiallyUpdatedUser,
      });
    });

    it('should handle empty update dto', async () => {
      const emptyDto = {};
      mockHttpClientService.put.mockResolvedValue(mockUser);

      const result = await service.updateProfile(userId, emptyDto);

      expect(httpClientService.put).toHaveBeenCalledWith(
        'user',
        `/users/${userId}`,
        emptyDto,
      );
      expect(result).toEqual({
        user: mockUser,
      });
    });

    it('should log update operation', async () => {
      const logSpy = jest.spyOn(Logger.prototype, 'log');
      mockHttpClientService.put.mockResolvedValue(updatedUser);

      await service.updateProfile(userId, updateProfileDto);

      expect(logSpy).toHaveBeenCalledWith(
        `Update profile information for user ${userId}`,
      );
      expect(logSpy).toHaveBeenCalledWith(
        `Fetched updated user information for user ${userId}`,
      );
    });

    it('should throw InternalServerErrorException when http service fails', async () => {
      const error = new Error('HTTP error');
      mockHttpClientService.put.mockRejectedValue(error);

      await expect(
        service.updateProfile(userId, updateProfileDto),
      ).rejects.toThrow(InternalServerErrorException);
      await expect(
        service.updateProfile(userId, updateProfileDto),
      ).rejects.toThrow('Failed to update user information');
    });

    it('should log error when http service fails', async () => {
      const errorSpy = jest.spyOn(Logger.prototype, 'error');
      const error = new Error('HTTP error');
      mockHttpClientService.put.mockRejectedValue(error);

      try {
        await service.updateProfile(userId, updateProfileDto);
      } catch (e) {
        // Expected to throw
      }

      expect(errorSpy).toHaveBeenCalledWith(
        `Failed to update user information for user ${userId} from core service`,
        error.stack,
      );
    });
  });
});