import { Module } from '@nestjs/common';

import { TransactionController } from '@controller/transaction/transaction.controller';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [TransactionController],
})
export class TransactionControllerModule {}
