import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User, UserInfo } from '../../models';
import { HttpClientService } from '../../services/http-client.service';

@Injectable()
export class UserSyncService {
  private readonly logger = new Logger(UserSyncService.name);
  constructor(private readonly httpClientService: HttpClientService) {}

  async getUserById(id: string): Promise<UserInfo | undefined> {
    try {
      this.logger.log(`Fetching user for id: ${id}`);

      if (!id) {
        this.logger.warn(`No user ID provided`);
        return undefined;
      }

      const user: User = await this.httpClientService.get(
        'user',
        `/users/${id}`,
      );

      this.logger.log(
        `Fetched user for id: ${id} data: ${JSON.stringify(user)}`,
      );

      return {
        id: user.id,
        name: user.name,
        betterAuthId: user.betterAuthId,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch user detail for ${id} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch user detail for user ${id}`,
      );
    }
  }

  async getUsersByIds(ids: string[]): Promise<UserInfo[]> {
    try {
      this.logger.log(`Fetching users for ids: ${ids.join(', ')}`);

      const users: User[] = await this.httpClientService.get(
        'user',
        `/users/ids/${ids.join(',')}`,
      );

      this.logger.log(
        `Fetched users for ids: ${ids.join(', ')} data: ${JSON.stringify(users)}`,
      );

      return users.map((user) => ({
        id: user.id,
        name: user.name,
        betterAuthId: user.betterAuthId,
      }));
    } catch (error) {
      this.logger.error(
        `Failed to fetch user detail for ${ids.join(', ')} from core service`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch user detail for users ${ids.join(', ')}`,
      );
    }
  }
}
