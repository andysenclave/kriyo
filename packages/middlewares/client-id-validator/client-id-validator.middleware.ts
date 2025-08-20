import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class ClientIdValidatorMiddleware implements NestMiddleware {
  private allowedClientIds: Set<string> = new Set();

  setAllowedClientIds(clientIds: string[]) {
    this.allowedClientIds = new Set(clientIds);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const clientId = req.header('CLIENT_ID');
    if (!clientId || !this.allowedClientIds.has(clientId)) {
      throw new UnauthorizedException('Invalid or missing CLIENT_ID');
    }
    next();
  }
}

export default ClientIdValidatorMiddleware;
