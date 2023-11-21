import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { ResponseMapper } from 'src/shared/mappers/Response.mapper';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth('access-token')
  public async getAllUsers() {
    return ResponseMapper.map({ data: await this.userService.findAllUsers() });
  }
}
