import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from './user.schema';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): IJwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
