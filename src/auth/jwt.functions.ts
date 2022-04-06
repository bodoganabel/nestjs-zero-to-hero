import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

// Validate and decode jwt token
export function decodeJwtToken(accessToken: string) {
  try {
    const decoded = jwt.verify(
      accessToken as string,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
    );

    return decoded;
  } catch (err) {
    console.log(err.message);
    throw new UnauthorizedException('Forbidden');
  }
}
