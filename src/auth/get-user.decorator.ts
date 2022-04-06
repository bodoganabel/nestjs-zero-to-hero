import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { decodeJwtToken } from './jwt.functions';
import { IJwtPayload } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): IJwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    const bearerToken = req.get('Authorization').split(' ')[1];
    console.log('bearerToken:');
    console.log(bearerToken);
    const decodedToken = decodeJwtToken(bearerToken);

    const { username, permissions } = decodedToken as IJwtPayload;
    return { username, permissions };
  },
);
