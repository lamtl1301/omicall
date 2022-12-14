import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { json } from 'body-parser';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { FormDataPipe } from './pipe/form-data.pipe';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT || 3000
  app.enableCors();

  app.setGlobalPrefix('api/v1')
  const swagger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Omicrm')
    .setDescription('API Omicrm')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha'
    }
  })

  app.useGlobalFilters(new GlobalExceptionFilter())
  // app.useGlobalPipes(new FormDataPipe())
   app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.use(json());
  await app.listen(port)
}
bootstrap();

