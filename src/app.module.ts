import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ControllerModule } from '@controller/controller.module';
import { MikroOrmOptions } from '@infrastructure/database/mikro-orm-options';
import { Environment } from '@infrastructure/environment/environment';
import { HandleErrorFilter } from '@infrastructure/error/handle-error.filter';
import { TimeInterceptor } from '@infrastructure/security/time.interceptor';

@Module({
  imports: [MikroOrmModule.forRootAsync({ useClass: MikroOrmOptions }), ControllerModule],
  providers: [
    { provide: Environment, useValue: Environment.getInstance() },
    { provide: APP_FILTER, useClass: HandleErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeInterceptor },
  ],
})
export class AppModule {}
