import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ControllerModule } from './1-controller/controller.module';
import { MikroOrmOptions } from './5-infrastructure/database/mikro-orm-options';
import { Environment } from './6-shared/environment/environment';
import { MapperModule } from './6-shared/mapper/mapper.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({ useClass: MikroOrmOptions }),
    MapperModule.forRootAsync('./src/4-model/mapping/*.ts'),
    ControllerModule,
  ],
  providers: [{ provide: Environment, useValue: Environment.getInstance() }],
})
export class AppModule {}
