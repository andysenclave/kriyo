import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../services/cache.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private cacheService: CacheService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const key = this.cacheService.generateCacheKey('rate_limit', ip);

    const limit = parseInt(process.env.RATE_LIMIT_MAX || '100');
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes

    try {
      const current = await this.cacheService.get<number>(key);
      const requests = current || 0;

      if (requests >= limit) {
        return res.status(429).json({
          error: 'Too many requests',
          message: `Rate limit exceeded. Maximum ${limit} requests per ${windowMs / 1000 / 60} minutes.`,
          retryAfter: Math.ceil(windowMs / 1000),
        });
      }

      await this.cacheService.set(
        key,
        requests + 1,
        Math.ceil(windowMs / 1000),
      );

      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - requests - 1));
      res.setHeader(
        'X-RateLimit-Reset',
        new Date(Date.now() + windowMs).toISOString(),
      );

      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      next();
    }
  }
}
