import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from '@kriyo/db';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private users: User[] = [];
  private idCounter = 1;

  /**
   * Create a new user
   */
  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.idCounter++,
      email: createUserDto.email,
      name: createUserDto.name,
      betterAuthId: createUserDto.betterAuthId,
      phoneNumber: createUserDto.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Get all users
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Get a single user by ID
   */
  findOne(id: number): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  /**
   * Update a user by ID
   */
  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const existing = this.users[index];
    const updated: User = {
      ...existing,
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[index] = updated;
    return updated;
  }

  /**
   * Delete a user by ID
   */
  remove(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
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
