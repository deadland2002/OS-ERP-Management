import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ValidationPipe,
} from '@nestjs/common';
import * as process from 'node:process';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

@Catch(BadRequestException)
export class ValidationExceptionCustom
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(200).json({
      statusCode: 200,
      error: true,
      message: exception.response.message,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionCustom());
  app.setGlobalPrefix('v1');
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
