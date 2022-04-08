import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ControllerModule } from './1-controller/controller.module';
import { MikroOrmOptions } from './5-infrastructure/database/mikro-orm-options';
import { HandleErrorFilter } from './5-infrastructure/error/handle-error.filter';
import { Environment } from './6-shared/environment/environment';
import { MapperModule } from './6-shared/mapper/mapper.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({ useClass: MikroOrmOptions }),
    MapperModule.forRootAsync(() => import('./4-model/mapping/index')),
    ControllerModule,
  ],
  providers: [
    { provide: Environment, useValue: Environment.getInstance() },
    { provide: APP_FILTER, useClass: HandleErrorFilter },
  ],
})
export class AppModule {}
