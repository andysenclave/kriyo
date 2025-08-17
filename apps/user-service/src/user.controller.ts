import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from 'generated/prisma';
import { CreateUserDto } from './dtos';
import { Logger } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return await this.userService.findUser({ id });
  }

  @Get('/verifyPhone/:phone')
  async checkUserExists(@Param('phone') phone: string): Promise<boolean> {
    const user = await this.userService.findUser({ phone });
    return !!user?.id;
  }

  @Get('/')
  async getAllUsers(): Promise<UserModel[]> {
    this.logger.log('Fetching all users');
    return this.userService.getAllUsers({
      skip: 0,
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post('/')
  async createUser(
    @Body()
    userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<UserModel>,
  ): Promise<UserModel> {
    return await this.userService.updateUser({
      where: { id },
      data: userData,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.deleteUser({ id });
  }
}
