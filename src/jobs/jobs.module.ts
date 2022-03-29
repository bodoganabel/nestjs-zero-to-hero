import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { JobsService } from './jobs.service';

@Module({
  imports: [AuthModule, ScheduleModule.forRoot()],
  providers: [JobsService],
})
export class JobsModule {}
