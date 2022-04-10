import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): IJwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
