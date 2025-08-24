import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(private readonly httpService: HttpService) {}

  private readonly services = {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:4000',
    user: process.env.USER_SERVICE_URL || 'http://localhost:4200',
    tasks: process.env.TASKS_SERVICE_URL || 'http://localhost:4400',
    projects: process.env.PROJECTS_SERVICE_URL || 'http://localhost:4600',
  };

  private mergeHeaders(headers?: any) {
    return {
      ...headers,
      CLIENT_ID: process.env.CLIENT_ID,
    };
  }

  async get(
    service: keyof typeof this.services,
    path: string,
    headers?: Record<string, string | string[]>,
  ) {
    const url = `${this.services[service]}${path}`;
    this.logger.log(`Fetching ${service} with url ${url}`);
    const response = await firstValueFrom(
      this.httpService.get(url, { headers: this.mergeHeaders(headers) }),
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
      this.httpService.post(url, data, { headers: this.mergeHeaders(headers) }),
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
      this.httpService.put(url, data, { headers: this.mergeHeaders(headers) }),
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
      this.httpService.delete(url, { headers: this.mergeHeaders(headers) }),
    );
    return response.data;
  }
}
