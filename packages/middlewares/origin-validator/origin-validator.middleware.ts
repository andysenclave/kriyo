import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class OriginValidatorMiddleware implements NestMiddleware {
  private allowedOrigins: Set<string> = new Set();

  setAllowedOrigins(origins: string[]) {
    this.allowedOrigins = new Set(origins);
  }

  use(req: Request, _res: Response, next: NextFunction): void {
    const origin = req.headers.origin;
    const host = req.headers.host;
    const referer = req.headers.referer;

    if (origin && !this.allowedOrigins.has(origin)) {
      throw new ForbiddenException('Access denied: Invalid origin');
    }

    if (
      referer &&
      !Array.from(this.allowedOrigins).some((allowedOrigin) => referer.startsWith(allowedOrigin))
    ) {
      throw new ForbiddenException('Access denied: Invalid referer');
    }

    if (!origin && !referer) {
      const requestHost = `http://${host}`;
      if (!this.allowedOrigins.has(requestHost)) {
        throw new ForbiddenException('Access denied: Invalid host');
      }
    }

    next();
  }
}

export default OriginValidatorMiddleware;
