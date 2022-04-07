import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from './jwt.service.ts';
import { JwtRepository } from './jwt.repository';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([JwtRepository]),
    TypeOrmModule.forFeature([RoleRepository]),
    TypeOrmModule.forFeature([PermissionRepository]),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
