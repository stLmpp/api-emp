import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import mikroOrmConfig from '../../mikro-orm.config';

export class MikroOrmOptions implements MikroOrmOptionsFactory {
  async createMikroOrmOptions(): Promise<MikroOrmModuleOptions<PostgreSqlDriver>> {
    return {
      ...mikroOrmConfig,
      autoLoadEntities: true,
    };
  }
}
