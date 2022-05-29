import { LoadStrategy, Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { NamingStrategy } from '@infrastructure/database/naming-strategy';
import { Environment } from '@infrastructure/environment/environment';
import { Logger } from '@infrastructure/logger/logger';

const environment = Environment.getInstance();

const logger = Logger.create('MikroORM');

const pathMigrationsTs = './src/5-infrastructure/database/migrations' as const;

const mikroOrmConfig: Options = {
  host: environment.dbHost,
  port: environment.dbPort,
  user: environment.dbUsername,
  password: environment.dbPassword,
  dbName: environment.dbDatabase,
  type: 'postgresql',
  migrations: {
    pathTs: pathMigrationsTs,
    path: environment.production ? './dist/5-infrastructure/database/migrations' : pathMigrationsTs,
    emit: 'ts',
    snapshot: false,
  },
  entities: ['./dist/4-model/entity/*.entity.js'],
  entitiesTs: ['./src/4-model/entity/*.entity.ts'],
  namingStrategy: NamingStrategy,
  discovery: { warnWhenNoEntities: false },
  debug: !environment.production,
  highlighter: new SqlHighlighter(),
  logger: message => logger.log(message),
  strict: true,
  loadStrategy: LoadStrategy.JOINED,
  allowGlobalContext: true,
};

export default mikroOrmConfig;
