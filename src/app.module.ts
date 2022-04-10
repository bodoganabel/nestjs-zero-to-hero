import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { AttachUserToRequestMiddleware } from './middlewares/attach-user-to-request.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: process.env.STAGE == 'development' ? true : false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'src', 'migrations')],
      migrationsTableName: 'migrations_history',
      migrationsRun: process.env.STAGE == 'development' ? true : false,
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
