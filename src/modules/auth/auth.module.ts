import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants/global.constants';
import { UserService } from '../users/users.service';
import { JwtStrategy } from './auth.jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule.register({ secret: JWT_SECRET }), PassportModule],
  providers: [UserService, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
