/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, User } from 'generated/prisma';
import { PasswordService } from './password/password.service';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Partial<User> | null> {
    const userData = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    const { passwordHash, ...user } = userData as User;

    return user;
  }

  async getAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { password, ...restData } = data;
    const hashedPassword = await this.passwordService.hashPassword(password);
    const userData: Prisma.UserCreateInput = {
      ...restData,
      passwordHash: hashedPassword,
    };

    return this.prisma.user.create({
      data: userData,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<Partial<User>> {
    const { where, data } = params;
    const userData = await this.prisma.user.update({
      data: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      where,
    });
    const { betterAuthId, passwordHash, ...user } = userData;
    return user;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
