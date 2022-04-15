import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { PersonEntity } from '@model/entity/person.entity';
import { TransactionItemEntity } from '@model/entity/transaction-item.entity';
import { TransactionEntity } from '@model/entity/transaction.entity';
import { UserEntity } from '@model/entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, PersonEntity, TransactionEntity, TransactionItemEntity])],
  exports: [MikroOrmModule],
})
export class RepositoryModule {}
