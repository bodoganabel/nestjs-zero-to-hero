import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { AttachUserToRequestMiddleware } from './middlewares/attach-user-to-request.middleware';
import { getMongodbConnectionString } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    MongooseModule.forRoot(getMongodbConnectionString()),
    AuthModule,
    JobsModule,
    BootstrapModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AttachUserToRequestMiddleware).forRoutes('*');
  }
}
