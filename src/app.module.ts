import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    MongooseModule.forRoot(getMongodbConnectionString(), {
      dbName: process.env.MONGODB_DATABASE_NAME,
    }),
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
