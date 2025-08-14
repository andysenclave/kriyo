import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from './prisma/prisma.service';
import { PasswordService } from './password/password.service';

@Module({
  providers: [PrismaService, UserService, PasswordService],
  controllers: [UserController],
})
export class AppModule {}
