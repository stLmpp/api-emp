import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransactionCardsParams } from '@model/dto/transaction/transaction-cards.params';
import { TransactionEntityToTransactionCardViewModelMapper } from '@model/mapping/transaction/transaction.entity-to-transaction-card.view-model.mapper';
import { TransactionCardViewModel } from '@model/view-model/transaction/transaction-card.view-model';
import { TransactionService } from '@service/transaction/transaction.service';

@ApiTags('Transactions')
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('cards')
  async getCards(@Param() { idUser }: TransactionCardsParams): Promise<TransactionCardViewModel[]> {
    return TransactionEntityToTransactionCardViewModelMapper.map(await this.transactionService.getCards(idUser));
  }
}
