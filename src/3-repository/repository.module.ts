import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { PersonEntity } from '../4-model/entity/person.entity';
import { TransactionItemEntity } from '../4-model/entity/transaction-item.entity';
import { TransactionEntity } from '../4-model/entity/transaction.entity';
import { UserEntity } from '../4-model/entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, PersonEntity, TransactionEntity, TransactionItemEntity])],
  exports: [MikroOrmModule],
})
export class RepositoryModule {}
