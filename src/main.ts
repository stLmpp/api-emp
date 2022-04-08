import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { version } from '../package.json';

import { Environment } from './6-shared/environment/environment';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api').useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const environment = app.get(Environment);

  if (!environment.production) {
    app.enableCors();
    const options = new DocumentBuilder().setTitle('Api').setVersion(version).build();
    const document = SwaggerModule.createDocument(app, options, {});
    SwaggerModule.setup('help', app, document, {
      customCss: `.swagger-ui .scheme-container { position: sticky; top: 0; z-index: 1; margin-bottom: 0; padding: 0.25rem 0; }`,
    });
  }

  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());

  await app.listen(3000);
}

bootstrap().then();
