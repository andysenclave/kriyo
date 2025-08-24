import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';
import { CacheService } from './cache.service';

@Module({
  imports: [HttpModule],
  providers: [HttpClientService, CacheService],
  exports: [HttpClientService, CacheService],
})
export class ServicesModule {}
