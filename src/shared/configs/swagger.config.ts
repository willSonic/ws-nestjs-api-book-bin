import { DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
export const swaggerOptions = new DocumentBuilder()
    .setTitle('Book Bin  Application')
    .setDescription('APIs for the  book bin application.')
    .setVersion('1.0.0')
    .setHost(`localhost:${config.get('express.port')}`)
    .setBasePath('/')
    .setSchemes('http')
    .setExternalDoc('For more information', 'http://swagger.io')
    .addBearerAuth('Authorization', 'header')
    .build();
