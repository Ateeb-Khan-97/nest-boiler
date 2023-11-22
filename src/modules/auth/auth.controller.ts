import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { JWT_EXPIRY_SECONDS } from 'src/shared/constants/global.constants';
import { Public } from './auth.public.decorator';
import { ResponseMapper } from 'src/shared/mappers/Response.mapper';
import { FastifyReply } from 'fastify';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  async login(@Body() user: LoginUserDTO, @Res() res: FastifyReply) {
    const loginData = await this.authService.login(user);
    res.cookie('accessToken', loginData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });
    res.status(200).send({
      status: 200,
      message: 'Successfully Login',
      data: loginData,
      success: true,
    });
  }

  @Public()
  @Post('register')
  async register(@Body() user: RegisterUserDTO) {
    return ResponseMapper.map({
      status: 201,
      message: 'Successfully Registered',
      data: await this.authService.register(user),
    });
  }

  @Post('logout')
  @ApiBearerAuth('access-token')
  async logout(@Res() res: FastifyReply) {
    res.clearCookie('accessToken');
    res
      .status(200)
      .send({ status: 200, message: 'Success', data: null, success: true });
  }
}
