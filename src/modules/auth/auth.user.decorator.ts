import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUser;
  },
);

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
}
