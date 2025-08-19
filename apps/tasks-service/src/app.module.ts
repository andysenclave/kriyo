import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  providers: [PrismaService, TasksService],
  controllers: [TasksController],
})
export class AppModule {}
