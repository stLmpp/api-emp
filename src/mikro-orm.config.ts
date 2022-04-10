import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { NamingStrategy } from './5-infrastructure/database/naming-strategy';
import { Environment } from './6-shared/environment/environment';
import { Logger } from './6-shared/logger/logger';

const environment = Environment.getInstance();

const logger = Logger.create('MikroORM');

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  host: environment.dbHost,
  port: environment.dbPort,
  user: environment.dbUsername,
  password: environment.dbPassword,
  dbName: environment.dbDatabase,
  type: 'postgresql',
  migrations: {
    pathTs: './src/5-infrastructure/database/migrations',
    path: './dist/5-infrastructure/database/migrations',
    emit: 'ts',
  },
  entities: ['./dist/4-model/entity/*.entity.js'],
  entitiesTs: ['./src/4-model/entity/*.entity.ts'],
  namingStrategy: NamingStrategy,
  discovery: { warnWhenNoEntities: false },
  debug: !environment.production,
  highlighter: new SqlHighlighter(),
  logger: message => logger.log(message),
  strict: true,
};

export default mikroOrmConfig;
