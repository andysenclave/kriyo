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
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('my/projects')
  @Version('1')
  @UseGuards(AuthGuard)
  async getMyProjects(@CurrentUser() user: AuthUser) {
    return this.projectsService.getProjectsByUserId(user.id);
  }

  @Post('my/projects')
  @Version('1')
  @UseGuards(AuthGuard)
  async createMyProject(
    @CurrentUser() user: AuthUser,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.createProject(user.id, createProjectDto);
  }

  @Put('my/projects/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  async updateMyProject(
    @CurrentUser() user: AuthUser,
    @Param('id') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(
      user.id,
      projectId,
      updateProjectDto,
    );
  }

  @Delete('my/projects/:id')
  @Version('1')
  @UseGuards(AuthGuard)
  async deleteMyProject(
    @CurrentUser() user: AuthUser,
    @Param('id') projectId: string,
  ) {
    return this.projectsService.deleteProject(user.id, projectId);
  }

  @Get('protected/projects/search/:search')
  @Version('1')
  @UseGuards(AuthGuard)
  async searchProjects(@Param('search') searchTerm: string) {
    return this.projectsService.searchProjects(searchTerm);
  }
}
