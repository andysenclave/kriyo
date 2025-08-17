import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { APIError } from 'better-auth';

@Injectable()
export class UserSyncService {
  private readonly userServiceUrl =
    process.env.USER_SERVICE_URL || 'localhost:4000/users';
  private readonly verifyUniquePhoneUrl = this.userServiceUrl + '/verifyPhone';
  private readonly logger = new Logger(UserSyncService.name);

  async syncUser(data: CreateUserDto): Promise<void> {
    try {
      this.logger.log(
        `Syncing user data to ${this.userServiceUrl} for user : ${data.name}`,
      );

      const response = await fetch(this.userServiceUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.logger.log(`Successfully synced user data for user : ${data.name}`);
    } catch (error) {
      this.logger.error(
        `Failed to sync user data for user : ${data.name}`,
        error,
      );
      throw new APIError('BAD_REQUEST', {
        message: 'User syncing failed with user service',
      });
    }
  }

  async verifyPhoneNumberIsUnique(phone: string): Promise<boolean> {
    try {
      this.logger.log(`Verifying if phone number is unique : ${phone}`);

      const phoneUrl = `${this.verifyUniquePhoneUrl}/${phone}`;
      const response = await fetch(phoneUrl, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = (await response.json()) as boolean;

      this.logger.log(`Successfully verified phone number : ${phone}`);
      return responseData;
    } catch (error) {
      this.logger.error(`Failed to verify phone number : ${phone}`, error);
      throw new APIError('BAD_REQUEST', {
        message: 'Verification failed',
      });
    }
  }
}
