import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from '@kriyo/db';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Removed in-memory storage and ID counter.

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        betterAuthId: createUserDto.betterAuthId,
        phoneNumber: createUserDto.phoneNumber,
      },
    });
  }

  /**
   * Get all users
   */
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /**
   * Get a single user by ID
   */
  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Update a user by ID
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          updatedAt: new Date(),
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null; // Return null if the user does not exist.
    }
  }

  /**
   * Delete a user by ID
   */
  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findOrCreateByBetterAuth(payload: {
    betterAuthId: string;
    email: string;
    name: string;
    phoneNumber: string;
  }) {
    const existing = await this.prisma.user.findUnique({
      where: { betterAuthId: payload.betterAuthId },
    });

    if (existing) return existing;

    return this.prisma.user.create({
      data: {
        betterAuthId: payload.betterAuthId,
        email: payload.email,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
      },
    });
  }
}
