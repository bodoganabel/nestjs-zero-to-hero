import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeJwtToken } from 'src/auth/jwt.functions';
import { IJwtPayload } from 'src/auth/user.schema';

@Injectable()
export class AttachUserToRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearerToken = authHeader.split(' ')[1];
      const decodedToken = decodeJwtToken(bearerToken);
      console.log('decodedToken');
      console.log(decodedToken);

      if (decodedToken) {
        req.user = decodedToken as IJwtPayload;
      } else {
        req.user = undefined;
      }
    }
    next();
    return;
  }
}
