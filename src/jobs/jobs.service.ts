import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtService } from 'src/auth/jwt.service.ts';
import { authConfig } from 'src/config';

//import { JwtService } from 'src/auth/jwt.service.ts';

@Injectable()
export class JobsService implements OnApplicationBootstrap {
  constructor(private jwtService: JwtService) {}
  private readonly logger = new Logger(JobsService.name);

  onApplicationBootstrap(): void {
    this.logger.log('Initializing jobs 👷‍♂️');
    this.jwtService.test();
  }

  @Cron(
    `*/${
      authConfig.cleanExpiredTokensPeriodMs / 1000
    } * * * * *` /*CronExpression.EVERY_HOUR*/,
  )
  handleCron() {
    this.logger.debug('Cleanup Expired JwtRefreshTokens');
    this.jwtService.removeExpiredJwtRefreshTokens();
  }
}
