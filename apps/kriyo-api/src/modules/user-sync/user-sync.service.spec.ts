/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { UserSyncService } from './user-sync.service';
import { HttpClientService } from '../../services/http-client.service';
import { User, UserInfo } from '../../models';

describe('UserSyncService', () => {
  let service: UserSyncService;
  let httpClientService: jest.Mocked<HttpClientService>;
  let logger: jest.Mocked<Logger>;

  const mockUsers: User[] = [
    {
      id: 'user1',
      email: 'user1@example.com',
      phone: '+1234567890',
      betterAuthId: 'auth1',
      name: 'John Doe',
      passwordHash: 'hash1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      emailVerified: true,
      phoneVerified: false,
    },
    {
      id: 'user2',
      email: 'user2@example.com',
      phone: '+0987654321',
      betterAuthId: 'auth2',
      name: 'Jane Smith',
      passwordHash: 'hash2',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
      emailVerified: false,
      phoneVerified: true,
    },
  ];

  const expectedUserInfos: UserInfo[] = [
    { id: 'user1', name: 'John Doe' },
    { id: 'user2', name: 'Jane Smith' },
  ];

  beforeEach(async () => {
    const mockHttpClientService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSyncService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
      ],
    }).compile();

    service = module.get<UserSyncService>(UserSyncService);
    httpClientService = module.get(HttpClientService);

    // Mock the logger
    logger = {
      log: jest.fn(),
      error: jest.fn(),
    } as any;

    // Replace the private logger with our mock
    (service as any).logger = logger;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsersByIds', () => {
    it('should successfully fetch users and return UserInfo array', async () => {
      const ids = ['user1', 'user2'];
      httpClientService.get.mockResolvedValue(mockUsers);

      const result = await service.getUsersByIds(ids);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'user',
        '/users/ids/user1,user2',
      );
      expect(logger.log).toHaveBeenCalledWith(
        'Fetching users for ids: user1, user2',
      );
      expect(logger.log).toHaveBeenCalledWith(
        'Fetched users for ids: user1, user2',
      );
      expect(result).toEqual(expectedUserInfos);
    });

    it('should handle single user ID', async () => {
      const ids = ['user1'];
      const singleUser = [mockUsers[0]];
      const expectedSingleUserInfo = [expectedUserInfos[0]];

      httpClientService.get.mockResolvedValue(singleUser);

      const result = await service.getUsersByIds(ids);

      expect(httpClientService.get).toHaveBeenCalledWith(
        'user',
        '/users/ids/user1',
      );
      expect(logger.log).toHaveBeenCalledWith('Fetching users for ids: user1');
      expect(logger.log).toHaveBeenCalledWith('Fetched users for ids: user1');
      expect(result).toEqual(expectedSingleUserInfo);
    });

    it('should handle empty ids array', async () => {
      const ids: string[] = [];
      httpClientService.get.mockResolvedValue([]);

      const result = await service.getUsersByIds(ids);

      expect(httpClientService.get).toHaveBeenCalledWith('user', '/users/ids/');
      expect(logger.log).toHaveBeenCalledWith('Fetching users for ids: ');
      expect(logger.log).toHaveBeenCalledWith('Fetched users for ids: ');
      expect(result).toEqual([]);
    });

    it('should handle users with only required fields for UserInfo', async () => {
      const ids = ['user3'];
      const minimalUser: User = {
        id: 'user3',
        name: 'Minimal User',
        email: '',
        phone: '',
        betterAuthId: '',
        passwordHash: '',
        createdAt: '',
        updatedAt: '',
        emailVerified: false,
        phoneVerified: false,
      };

      httpClientService.get.mockResolvedValue([minimalUser]);

      const result = await service.getUsersByIds(ids);

      expect(result).toEqual([{ id: 'user3', name: 'Minimal User' }]);
    });

    it('should throw InternalServerErrorException when HTTP call fails', async () => {
      const ids = ['user1', 'user2'];
      const error = new Error('Network error');
      httpClientService.get.mockRejectedValue(error);

      await expect(service.getUsersByIds(ids)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Failed to fetch user detail for user1, user2 from core service',
        error.stack,
      );
    });

    it('should throw InternalServerErrorException with correct message for single ID', async () => {
      const ids = ['user1'];
      const error = new Error('Service unavailable');
      httpClientService.get.mockRejectedValue(error);

      await expect(service.getUsersByIds(ids)).rejects.toThrow(
        new InternalServerErrorException(
          'Failed to fetch user detail for users user1',
        ),
      );
    });

    it('should throw InternalServerErrorException with correct message for multiple IDs', async () => {
      const ids = ['user1', 'user2', 'user3'];
      const error = new Error('Timeout');
      httpClientService.get.mockRejectedValue(error);

      await expect(service.getUsersByIds(ids)).rejects.toThrow(
        new InternalServerErrorException(
          'Failed to fetch user detail for users user1, user2, user3',
        ),
      );
    });

    it('should handle error without stack trace', async () => {
      const ids = ['user1'];
      const error = { message: 'Error without stack' };
      httpClientService.get.mockRejectedValue(error);

      await expect(service.getUsersByIds(ids)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(logger.error).toHaveBeenCalledWith(
        'Failed to fetch user detail for user1 from core service',
        undefined,
      );
    });

    it('should properly transform User objects to UserInfo objects', async () => {
      const ids = ['user1'];
      const userWithExtraFields: User = {
        id: 'user1',
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1111111111',
        betterAuthId: 'betterauth123',
        passwordHash: 'secrethash',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        emailVerified: true,
        phoneVerified: true,
      };

      httpClientService.get.mockResolvedValue([userWithExtraFields]);

      const result = await service.getUsersByIds(ids);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'user1',
        name: 'Test User',
      });
      expect(result[0]).not.toHaveProperty('email');
      expect(result[0]).not.toHaveProperty('phone');
      expect(result[0]).not.toHaveProperty('betterAuthId');
      expect(result[0]).not.toHaveProperty('passwordHash');
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
