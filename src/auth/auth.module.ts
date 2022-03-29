import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from './jwt.service.ts';
import { JwtRepository } from './jwt.repository';

export const authConfig = {
  accessToxenExpiration: '20m', //jwt expiration string
  autoLogoutPeriodMs: 30 * 60 * 1000,
  cleanExpiredTokensPeriodMs: 60 * 60 * 1000,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, JwtService, JwtRepository],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
