import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Access environment variables using ConfigService
  const configService = app.get(ConfigService);
  const url = configService.get<string>('CLIENT');
  console.log(url)
  app.use(morgan('tiny'));
  app.enableCors({
    origin: url,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
