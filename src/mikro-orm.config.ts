import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { NamingStrategy } from './5-infrastructure/database/naming-strategy';
import { Environment } from './6-shared/environment/environment';

const environment = Environment.getInstance();

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  host: environment.dbHost,
  port: environment.dbPort,
  user: environment.dbUsername,
  password: environment.dbPassword,
  dbName: environment.dbDatabase,
  type: 'postgresql',
  migrations: { pathTs: './src/migrations', path: './dist/migrations', emit: 'ts' },
  entities: ['./dist/4-model/entity/*.entity.ts'],
  entitiesTs: ['./src/4-model/entity/*.entity.js'],
  namingStrategy: NamingStrategy,
  discovery: { warnWhenNoEntities: false },
};

export default mikroOrmConfig;
