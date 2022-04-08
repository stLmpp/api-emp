import { join } from 'path';

import { DynamicModule, Global, Module } from '@nestjs/common';
import globby from 'globby';

import { mapperService, MapperService } from './mapper.service';

@Module({})
@Global()
export class MapperModule {
  static async forRootAsync(glob: string): Promise<DynamicModule> {
    await import('../../4-model/mapping/user.entity-to-user-with-value.view-model'); // TODO fix this
    return {
      module: MapperModule,
      providers: [{ provide: MapperService, useValue: mapperService }],
      exports: [MapperService],
    };
  }
}
