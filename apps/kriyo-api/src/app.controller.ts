import { Controller, Get, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class AppController {
  constructor() {}

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Returns the health status of the Kriyo API service',
  })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    schema: {
      type: 'object',
      properties: {
        ok: { type: 'boolean', example: true },
        service: { type: 'string', example: 'kriyo-api' },
        version: { type: 'number', example: 1 },
      },
    },
  })
  ok() {
    return { ok: true, service: 'kriyo-api', version: 1 };
  }
}
