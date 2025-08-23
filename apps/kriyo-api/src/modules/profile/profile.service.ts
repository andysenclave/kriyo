import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpClientService } from 'src/services/http-client.service';
import { User } from 'src/models';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(private readonly httpClientService: HttpClientService) {}
  async getProfile(userId: string) {
    try {
      this.logger.log(`Fetching profile information for user ${userId}`);

      const user: User = await this.httpClientService.get(
        'user',
        `/users/${userId}`,
      );

      this.logger.log(`Fetched user information for user ${userId}`);

      return {
        user,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch user information for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch user information`,
      );
    }
  }

  async updateProfile(userId: string, updateProfileDto: Partial<User>) {
    try {
      this.logger.log(`Update profile information for user ${userId}`);

      const user: User = await this.httpClientService.put(
        'user',
        `/users/${userId}`,
        updateProfileDto,
      );

      this.logger.log(`Fetched updated user information for user ${userId}`);

      return {
        user,
      };
    } catch (error) {
      this.logger.error(
        `Failed to update user information for user ${userId} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to update user information`,
      );
    }
  }
}
