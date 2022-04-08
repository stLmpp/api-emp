import { DynamicModule, Global, Module } from '@nestjs/common';

import { mapperService, MapperService } from './mapper.service';

@Module({})
@Global()
export class MapperModule {
  static async forRootAsync(importFn: () => Promise<any>): Promise<DynamicModule> {
    await importFn();
    return {
      module: MapperModule,
      providers: [{ provide: MapperService, useValue: mapperService }],
      exports: [MapperService],
    };
  }
}
