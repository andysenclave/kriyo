import { createAuthMiddleware, APIError } from 'better-auth/api';
import { Logger } from '@nestjs/common';
import { HookEndpointContext } from 'better-auth';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { UserSyncService } from 'src/auth/sync/user-sync/user-sync.service';
import 'dotenv/config';

const logger = new Logger('PreSignup');

function validateClientId(ctx: HookEndpointContext): void {
  logger.log('Validating client id in header');
  const headers = ctx?.headers;
  const allowedClientIds = process.env.ALLOWED_CLIENT_IDS?.split(',') || [];

  if (!headers) {
    throw new APIError('UNAUTHORIZED', {
      message: 'Invalid or missing CLIENT_ID',
    });
  }

  const clientId = headers?.get('CLIENT_ID');

  if (!clientId) {
    throw new APIError('UNAUTHORIZED', {
      message: 'Invalid or missing CLIENT_ID',
    });
  }

  if (clientId && !allowedClientIds.includes(clientId)) {
    throw new APIError('UNAUTHORIZED', {
      message: 'Invalid or missing CLIENT_ID',
    });
  }
}

async function validateIndianPhoneNumber(ctx: HookEndpointContext) {
  logger.log('Checking valid indian phone number');
  const phone: string | undefined = await ctx.body?.phone;
  if (!phone) {
    logger.warn(`Phone number is required`);
    throw new APIError('BAD_REQUEST', { message: 'Phone number is required' });
  }

  const hasValidPhoneNumber = isValidPhoneNumber(phone, 'IN');
  if (!hasValidPhoneNumber) {
    logger.warn(`Invalid phone number: ${phone}`);
    throw new APIError('BAD_REQUEST', { message: 'Invalid phone number' });
  }
  logger.log(`OK: phone number ${phone}`);
}

async function verifyIfPhoneAlreadyExists(ctx: HookEndpointContext) {
  logger.log('Checking if phone number already exists');
  try {
    const userSyncService = new UserSyncService();
    const phone: string = (await ctx.body?.phone) ?? '';

    const phoneExists = await userSyncService.verifyPhoneNumberIsUnique(phone);

    if (phoneExists) {
      logger.warn(`Phone number already exists: ${phone}`);
      throw new APIError('BAD_REQUEST', {
        message: 'Phone number already exists',
      });
    }

    logger.log('Phone number verified successfully');
  } catch (error) {
    logger.error('Error syncing user', error);
    throw new APIError('BAD_REQUEST', {
      message: 'User syncing failed with user service',
    });
  }
}

const preSignup = createAuthMiddleware(async (ctx: HookEndpointContext) => {
  if (ctx.path !== '/sign-up/email' || ctx.method !== 'POST') {
    return;
  }

  logger.log(`Pre-signup start: ${ctx.method} ${ctx.path}`);
  validateClientId(ctx);
  await validateIndianPhoneNumber(ctx);
  await verifyIfPhoneAlreadyExists(ctx);
  logger.log('Pre-signup complete');
});

export default preSignup;
