import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/user.decorator';
import type { AuthUser } from '../../auth/user.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('my/tasks')
  @Version('1')
  @UseGuards(AuthGuard)
  async getMyTasks(@CurrentUser() user: AuthUser) {
    return this.tasksService.getTasksByUserId(user.id);
  }

  @Get('my/tasks/:dueDate')
  @Version('1')
  @UseGuards(AuthGuard)
  async getMyTasksByDate(
    @CurrentUser() user: AuthUser,
    @Param('dueDate') dueDate: string,
  ) {
    return this.tasksService.getTasksByUserAndDate(user.id, dueDate);
  }

  @Post('my/tasks')
  @Version('1')
  @UseGuards(AuthGuard)
  async createMyTask(
    @CurrentUser() user: AuthUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(user.id, createTaskDto);
  }

  @Put('my/tasks/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  async updateMyTask(
    @CurrentUser() user: AuthUser,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(user.id, taskId, updateTaskDto);
  }

  @Delete('my/tasks/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  async deleteMyTask(
    @CurrentUser() user: AuthUser,
    @Param('id') taskId: string,
  ) {
    return this.tasksService.deleteTask(user.id, taskId);
  }

  @Get('protected/tasks/search/:search')
  @Version('1')
  @UseGuards(AuthGuard)
  async searchTasks(@Param('search') searchTerm: string) {
    return this.tasksService.searchTasks(searchTerm);
  }
}
