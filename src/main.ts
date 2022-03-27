import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

function showAppStage() {
  console.log(
    process.env.STAGE === 'production'
      ? '🍏 STAGE:PRODUCTION 🍏'
      : '🧱 STAGE:DEVELOPMENT 🧱',
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}

async function main() {
  showAppStage();
  await bootstrap();
  showAppStage();
}

main();
