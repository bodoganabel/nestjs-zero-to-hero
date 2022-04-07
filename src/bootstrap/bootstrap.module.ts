import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/user.repository';
import { BootstrapService } from './bootstrap.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [BootstrapService],
})
export class BootstrapModule {}
