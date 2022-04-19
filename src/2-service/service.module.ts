import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';

import { RepositoryModule } from '@repository/repository.module';
import { TransactionService } from '@service/transaction/transaction.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService, TransactionService],
  exports: [UserService, TransactionService],
})
export class ServiceModule {}
