import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ServicesModule } from '../../services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
