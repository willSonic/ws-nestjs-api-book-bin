import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {swaggerOptions} from "./shared/configs/swagger.config";
import * as config from 'config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  console.log('Listening on swagger =',config.get('swagger.path'))
   SwaggerModule.setup(config.get('swagger.path'), app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  console.log('Listening on port =',config.get('express.port'))
  await app.listen(config.get('express.port'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
