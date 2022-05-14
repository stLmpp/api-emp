import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';

import { RepositoryModule } from '@repository/repository.module';
import { PersonService } from '@service/person/person.service';
import { TransactionService } from '@service/transaction/transaction.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService, TransactionService, PersonService],
  exports: [UserService, TransactionService, PersonService],
})
export class ServiceModule {}
