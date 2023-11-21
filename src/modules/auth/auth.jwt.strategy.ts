import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { JWT_SECRET } from '../../shared/constants/global.constants';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CommonService } from '../common/common.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
        JwtStrategy.extractJWT,
      ]),
      ignoreExpiration: process.env.NODE_ENV === 'dev',
      secretOrKey: JWT_SECRET,
    });
  }

  private static extractJWT(req): string | null {
    if (req.cookies && 'token' in req.cookies) return req.cookies.token;
    return null;
  }

  async validate(
    payload: User,
  ): Promise<Omit<User, 'password' | 'created' | 'updated'>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email: payload.email },
      });
      return this.commonService.exclude(user, [
        'password',
        'created',
        'updated',
      ]) as { id: string; name: string; username: string; email: string };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
