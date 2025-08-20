import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  private readonly services = {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:4002',
    user: process.env.USER_SERVICE_URL || 'http://localhost:4000',
    tasks: process.env.TASKS_SERVICE_URL || 'http://localhost:4006',
    projects: process.env.PROJECTS_SERVICE_URL || 'http://localhost:4008',
  };

  async get(service: keyof typeof this.services, path: string, headers?: any) {
    const url = `${this.services[service]}${path}`;
    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return response.data;
  }

  async post(
    service: keyof typeof this.services,
    path: string,
    data: any,
    headers?: any,
  ) {
    const url = `${this.services[service]}${path}`;
    const response = await firstValueFrom(
      this.httpService.post(url, data, { headers }),
    );
    return response.data;
  }

  async put(
    service: keyof typeof this.services,
    path: string,
    data: any,
    headers?: any,
  ) {
    const url = `${this.services[service]}${path}`;
    const response = await firstValueFrom(
      this.httpService.put(url, data, { headers }),
    );
    return response.data;
  }

  async delete(
    service: keyof typeof this.services,
    path: string,
    headers?: any,
  ) {
    const url = `${this.services[service]}${path}`;
    const response = await firstValueFrom(
      this.httpService.delete(url, { headers }),
    );
    return response.data;
  }
}
