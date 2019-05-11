import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';
import { swaggerOptions } from './shared/configs/swagger.config';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  console.log('Listening on swagger.path =',config.get('swagger.path'))
   SwaggerModule.setup(config.get('swagger.path'), app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  console.log('Listening on port =',config.get('express.port'))
  await app.listen(config.get('express.port'));

}
bootstrap();
