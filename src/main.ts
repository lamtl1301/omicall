import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { FormDataPipe } from './pipe/form-data.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.useGlobalPipes(new FormDataPipe())
  app.useGlobalPipes(new ValidationPipe( {transform: true}))
  await app.listen(3000);
}
bootstrap();
