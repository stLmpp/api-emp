import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransactionItemCreateDto } from '@model/dto/transaction-item/transaction-item-create.dto';
import { TransactionItemParams } from '@model/dto/transaction-item/transaction-item.params';
import { TransactionItemEntityTransactionItemViewModelMapper } from '@model/mapping/trasaction-item/transaction-item.entity-transaction-item.view-model.mapper';
import { TransactionItemViewModel } from '@model/view-model/transaction-item/transaction-item.view-model';
import { TransactionItemService } from '@service/transaction-item/transaction-item.service';

@ApiTags('Transaction item')
@Controller()
export class TransactionItemController {
  constructor(private readonly transactionItemService: TransactionItemService) {}

  @Post()
  async create(
    @Param() { idTransaction }: TransactionItemParams,
    @Body() dto: TransactionItemCreateDto
  ): Promise<TransactionItemViewModel> {
    return TransactionItemEntityTransactionItemViewModelMapper.map(
      await this.transactionItemService.create(idTransaction, dto)
    );
  }
}
