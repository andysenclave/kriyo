import { Injectable, Logger } from '@nestjs/common';
import { Auth, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import beforeAuthPipeline from './hooks/before';
import afterAuthPipeline from './hooks/after';

@Injectable()
export class BetterAuthService {
  private readonly prisma = new PrismaClient();
  private readonly logger = new Logger(BetterAuthService.name);
  public auth: Auth;

  constructor() {
    this.initializeBetterAuth();
  }

  private initializeBetterAuth() {
    this.auth = betterAuth({
      baseURL: process.env.BETTER_AUTH_URL,
      secret: process.env.BETTER_AUTH_SECRET,
      database: prismaAdapter(this.prisma, {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
      },
      trustedOrigins: [
        process.env.KRIYO_UI_BASE_URL || 'http://localhost:3000',
      ],
      hooks: {
        before: beforeAuthPipeline,
        after: afterAuthPipeline,
      },
    }) as unknown as Auth;
  }

  protected getBetterAuthInstance() {
    return this.auth;
  }
}
