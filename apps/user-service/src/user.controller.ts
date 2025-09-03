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
  async getUserById(
    @Param('id') id: string,
  ): Promise<Partial<UserModel> | null> {
    return await this.userService.findUser({ betterAuthId: id });
  }

  @Get('/verifyPhone/:phone')
  async checkUserExists(@Param('phone') phone: string): Promise<boolean> {
    this.logger.log(`Checking if user exists with phone: ${phone}`);
    const user = await this.userService.findUser({ phone });
    return !!user?.id;
  }

  @Get('/ids/:ids')
  async getUsersByIds(@Param('ids') ids: string): Promise<UserModel[]> {
    this.logger.log(`Fetching users with ids: ${ids}`);

    const userIds = ids.split(',').map((id) => id.trim());
    this.logger.log(`Parsed user IDs: ${JSON.stringify(userIds)}`);

    const result = await this.userService.getAllUsers({
      where: { betterAuthId: { in: userIds } },
    });

    this.logger.log(
      `Found ${result.length} users for IDs: ${JSON.stringify(userIds)}`,
    );
    this.logger.log(
      `Query result: ${JSON.stringify(result.map((u) => ({ id: u.id, name: u.name })))}`,
    );

    return result;
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
  ): Promise<Partial<UserModel>> {
    return await this.userService.updateUser({
      where: { betterAuthId: id },
      data: userData,
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.deleteUser({ id });
  }
}
