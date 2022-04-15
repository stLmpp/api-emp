import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { version } from '../package.json';

import { Environment } from './6-shared/environment/environment';
import { Logger } from './6-shared/logger/logger';
import { AppModule } from './app.module';

const logger = Logger.create('bootstrap');

async function bootstrap(): Promise<void> {
  logger.log('Bootstrapping application');

  const app = await NestFactory.create(AppModule);

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log({ query: req.query });
    next();
  });

  const migrator = app.get(MikroORM).getMigrator();

  logger.log('Getting pending migrations');

  const pendingMigrations = await migrator.getPendingMigrations();

  logger.log(`Found ${pendingMigrations.length} pending migrations`);

  if (pendingMigrations.length) {
    throw new Error(`There are pending migrations to run`);
  }

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

  logger.log(`Starting to listen on port ${environment.port}`);

  await app.listen(environment.port, environment.host);

  logger.log(`Listening on port ${environment.port}`);
}

bootstrap().then();
