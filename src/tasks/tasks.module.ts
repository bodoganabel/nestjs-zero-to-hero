import { TasksController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksRepository]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
