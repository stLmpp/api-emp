import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';

import mikroOrmConfig from '../../mikro-orm.config';

export class MikroOrmOptions implements MikroOrmOptionsFactory {
  async createMikroOrmOptions(): Promise<MikroOrmModuleOptions> {
    return {
      ...mikroOrmConfig,
      autoLoadEntities: true,
    };
  }
}
