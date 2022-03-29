import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JobsService } from './jobs.service';

@Module({
  imports: [AuthModule],
  providers: [JobsService],
})
export class JobsModule {}
