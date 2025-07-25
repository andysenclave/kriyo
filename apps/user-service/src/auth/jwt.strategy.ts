/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  phoneNumber: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('❌ JWT_SECRET is not defined');
    }
  }

  async validate(payload: JwtPayload) {
    const { sub, email, name, phoneNumber } = payload;

    if (!sub || !email || !phoneNumber) {
      throw new UnauthorizedException('Invalid JWT payload');
    }

    const user = await this.userService.findOrCreateByBetterAuth({
      betterAuthId: sub,
      email,
      name,
      phoneNumber,
    });

    return user; // becomes request.user
  }
}
