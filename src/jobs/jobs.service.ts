import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtService } from 'src/auth/jwt.service.ts';
//import { JwtService } from 'src/auth/jwt.service.ts';

@Injectable()
export class JobsService implements OnApplicationBootstrap {
  constructor(private jwtService: JwtService) {}
  private readonly logger = new Logger(JobsService.name);

  onApplicationBootstrap(): void {
    this.logger.log('Initializing jobs 👷‍♂️');
    this.jwtService.test();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.debug('Called Every 5 seconds');
    this.jwtService.removeExpiredJwtRefreshTokens();
  }
}
