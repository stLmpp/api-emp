import { LoadStrategy, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { NamingStrategy } from '@infrastructure/database/naming-strategy';
import { Environment } from '@shared/environment/environment';
import { Logger } from '@shared/logger/logger';

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
  loadStrategy: LoadStrategy.JOINED,
};

export default mikroOrmConfig;
