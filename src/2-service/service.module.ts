import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';

import { RepositoryModule } from '@repository/repository.module';
import { PersonService } from '@service/person/person.service';
import { TransactionItemService } from '@service/transaction-item/transaction-item.service';
import { TransactionService } from '@service/transaction/transaction.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService, TransactionService, PersonService, TransactionItemService],
  exports: [UserService, TransactionService, PersonService, TransactionItemService],
})
export class ServiceModule {}
