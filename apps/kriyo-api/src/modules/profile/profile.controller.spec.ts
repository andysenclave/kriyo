/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthUser } from '../../auth/user.decorator';
import { UpdateUserDto } from './dtos';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService: ProfileService;

  const mockProfileService = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  };

  const mockUser: AuthUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMyProfile', () => {
    it('should call profileService.getProfile with user id', async () => {
      const expectedResult = {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
          phone: '1234567890',
          betterAuthId: 'auth-123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      mockProfileService.getProfile.mockResolvedValue(expectedResult);

      const result = await controller.getMyProfile(mockUser);

      expect(profileService.getProfile).toHaveBeenCalledWith('user-123');
      expect(profileService.getProfile).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from profileService', async () => {
      const error = new Error('Service error');
      mockProfileService.getProfile.mockRejectedValue(error);

      await expect(controller.getMyProfile(mockUser)).rejects.toThrow(
        'Service error',
      );
    });
  });

  describe('updateMyProfile', () => {
    const updateProfileDto: UpdateUserDto = {
      name: 'Updated Name',
      phone: '9876543210',
    };

    it('should call profileService.updateProfile with user id and dto', async () => {
      const expectedResult = {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Updated Name',
          phone: '9876543210',
          betterAuthId: 'auth-123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      mockProfileService.updateProfile.mockResolvedValue(expectedResult);

      const result = await controller.updateMyProfile(
        mockUser,
        updateProfileDto,
      );

      expect(profileService.updateProfile).toHaveBeenCalledWith(
        'user-123',
        updateProfileDto,
      );
      expect(profileService.updateProfile).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should handle empty update dto', async () => {
      const emptyDto: UpdateUserDto = {};
      const expectedResult = {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
          phone: '1234567890',
          betterAuthId: 'auth-123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      mockProfileService.updateProfile.mockResolvedValue(expectedResult);

      const result = await controller.updateMyProfile(mockUser, emptyDto);

      expect(profileService.updateProfile).toHaveBeenCalledWith(
        'user-123',
        emptyDto,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should propagate errors from profileService', async () => {
      const error = new Error('Service error');
      mockProfileService.updateProfile.mockRejectedValue(error);

      await expect(
        controller.updateMyProfile(mockUser, updateProfileDto),
      ).rejects.toThrow('Service error');
    });
  });
});
