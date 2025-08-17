import { createAuthMiddleware } from 'better-auth/api';
import { Logger } from '@nestjs/common';
import { APIError, HookEndpointContext } from 'better-auth';
import { CreateUserDto } from 'src/auth/sync/user-sync/dtos';
import { UserSyncService } from 'src/auth/sync/user-sync/user-sync.service';

const logger = new Logger('PostSignup');

async function syncUser(ctx: HookEndpointContext) {
  logger.log('Syncing user service');
  try {
    const userSyncService = new UserSyncService();
    const userData = {
      name: ctx.body?.name,
      email: ctx.body?.email,
      phone: ctx.body?.phone,
      password: ctx.body?.password,
      betterAuthId: ctx.context.newSession?.user.id,
    } as CreateUserDto;

    await userSyncService.syncUser(userData);

    logger.log('User synced successfully');
  } catch (error) {
    logger.error('Error syncing user', error);
    throw new APIError('BAD_REQUEST', {
      message: 'User syncing failed with user service',
    });
  }
}

const postSignup = createAuthMiddleware(async (ctx: HookEndpointContext) => {
  if (ctx.path !== '/sign-up/email' || ctx.method !== 'POST') {
    return;
  }

  logger.log(`Post-signup start: ${ctx.method} ${ctx.path}`);
  await syncUser(ctx);
  logger.log('Post-signup complete');
});

export default postSignup;
