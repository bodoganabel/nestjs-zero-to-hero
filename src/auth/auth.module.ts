import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from './jwt.service.ts';
import { JwtRepository } from './jwt.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([JwtRepository]),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
