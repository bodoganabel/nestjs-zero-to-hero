import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JobsService {
  constructor(private jwtService: JwtService) {
    jwtService.removeExpiredJwtRefreshTokens();
  }
}
