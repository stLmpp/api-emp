import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ControllerModule } from '@controller/controller.module';
import { MikroOrmOptions } from '@infrastructure/database/mikro-orm-options';
import { Environment } from '@infrastructure/environment/environment';
import { HandleErrorFilter } from '@infrastructure/error/handle-error.filter';

@Module({
  imports: [MikroOrmModule.forRootAsync({ useClass: MikroOrmOptions }), ControllerModule],
  providers: [
    { provide: Environment, useValue: Environment.getInstance() },
    { provide: APP_FILTER, useClass: HandleErrorFilter },
  ],
})
export class AppModule {}
