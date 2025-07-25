import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should create a user with phone number', () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        phoneNumber: '+919876543210',
        betterAuthId: 'auth_123',
      };

      const result = controller.create(createUserDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(createUserDto.email);
      expect(result.name).toBe(createUserDto.name);
      expect(result.phoneNumber).toBe(createUserDto.phoneNumber);
      expect(result.betterAuthId).toBe(createUserDto.betterAuthId);
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      const result = controller.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        phoneNumber: '+919876543210',
        betterAuthId: 'auth_123',
      };

      const createdUser = controller.create(createUserDto);
      const result = controller.findOne(createdUser.id);

      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update a user including phone number', () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        phoneNumber: '+919876543210',
        betterAuthId: 'auth_123',
      };

      const createdUser = controller.create(createUserDto);

      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
        phoneNumber: '+919876543211',
      };

      const result = controller.update(createdUser.id, updateUserDto);

      expect(result.name).toBe(updateUserDto.name);
      expect(result.phoneNumber).toBe(updateUserDto.phoneNumber);
      expect(result.email).toBe(createUserDto.email); // unchanged
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        phoneNumber: '+919876543210',
        betterAuthId: 'auth_123',
      };

      const createdUser = controller.create(createUserDto);
      controller.remove(createdUser.id);

      expect(() => controller.findOne(createdUser.id)).toThrow();
    });
  });
});
