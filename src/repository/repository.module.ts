import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  exports: [MikroOrmModule],
})
export class RepositoryModule {}
