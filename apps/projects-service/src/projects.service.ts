import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, Project } from 'generated/prisma';
import { CreateProjectDto } from './dtos';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findProject(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return await this.prisma.project.findUnique({
      where: projectWhereUniqueInput,
    });
  }

  async getAllProjects(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }): Promise<Project[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    return await this.prisma.project.create({
      data,
    });
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    const { where, data } = params;
    return await this.prisma.project.update({
      data,
      where,
    });
  }

  async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return await this.prisma.project.delete({
      where,
    });
  }
}
