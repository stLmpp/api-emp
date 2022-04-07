import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { MikroOrmOptions } from './database/mikro-orm-options';
import { Environment } from './environment/environment';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [MikroOrmModule.forRootAsync({ useClass: MikroOrmOptions }), RepositoryModule],
  providers: [{ provide: Environment, useValue: Environment.getInstance() }],
})
export class AppModule {}
