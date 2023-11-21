import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthHelpers } from 'src/shared/helpers/auth.helper';
import { GLOBAL_CONFIG } from 'src/config/global.config';
import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private commonService: CommonService,
  ) {}

  public async login({ email, password }: LoginUserDTO) {
    const userData = await this.userService.findUser({
      email,
    });

    if (!userData) throw new UnauthorizedException();

    const isMatch = await AuthHelpers.verify(password, userData.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = this.commonService.exclude(userData, ['password']);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }

  public async register(user: RegisterUserDTO) {
    return this.userService.createUser(user);
  }
}
