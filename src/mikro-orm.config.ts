import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { NamingStrategy } from './database/naming-strategy';
import { Environment } from './environment/environment';

const environment = Environment.getInstance();

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  host: environment.dbHost,
  port: environment.dbPort,
  user: environment.dbUsername,
  password: environment.dbPassword,
  dbName: environment.dbDatabase,
  type: 'postgresql',
  migrations: { pathTs: './src/migrations', path: './dist/migrations', emit: 'ts' },
  entities: ['./dist/entities/*.entity.ts'],
  entitiesTs: ['./src/entities/*.entity.js'],
  namingStrategy: NamingStrategy,
};

export default mikroOrmConfig;
