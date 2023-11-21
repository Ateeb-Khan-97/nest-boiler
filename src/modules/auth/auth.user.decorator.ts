import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IsString } from 'class-validator';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUser;
  },
);

export abstract class IUser {
  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public username: string;

  @IsString()
  public email: string;
}
