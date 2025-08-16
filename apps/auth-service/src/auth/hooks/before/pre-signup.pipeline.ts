import { createAuthMiddleware, APIError } from 'better-auth/api';
import { Logger } from '@nestjs/common';
import { HookEndpointContext } from 'better-auth';
import { isValidPhoneNumber } from 'libphonenumber-js';

const logger = new Logger('PreSignup');

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

const preSignup = createAuthMiddleware(async (ctx: HookEndpointContext) => {
  if (ctx.path !== '/sign-up/email' || ctx.method !== 'POST') {
    return;
  }

  logger.log(`Pre-signup start: ${ctx.method} ${ctx.path}`);
  await validateIndianPhoneNumber(ctx);
  logger.log('Pre-signup complete');
});

export default preSignup;
