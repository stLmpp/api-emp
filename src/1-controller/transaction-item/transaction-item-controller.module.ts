import { Module } from '@nestjs/common';

import { TransactionItemController } from '@controller/transaction-item/transaction-item.controller';
import { ServiceModule } from '@service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [TransactionItemController],
})
export class TransactionItemControllerModule {}
