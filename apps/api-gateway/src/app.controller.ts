import { Controller, Get, Version } from '@nestjs/common';

@Controller('health')
export class AppController {
  constructor() {}

  @Get()
  @Version('1')
  ok() {
    return { ok: true, service: 'api-gateway', version: 1 };
  }
}
