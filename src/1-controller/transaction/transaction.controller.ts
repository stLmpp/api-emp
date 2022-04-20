import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransactionCreateDto } from '@model/dto/transaction/transaction-create.dto';
import { TransactionParams } from '@model/dto/transaction/transaction.params';
import { TransactionEntityToTransactionCardViewModelMapper } from '@model/mapping/transaction/transaction.entity-to-transaction-card.view-model.mapper';
import { TransactionCardViewModel } from '@model/view-model/transaction/transaction-card.view-model';
import { TransactionService } from '@service/transaction/transaction.service';

@ApiTags('Transactions')
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('cards')
  async getCards(@Param() { idUser }: TransactionParams): Promise<TransactionCardViewModel[]> {
    return TransactionEntityToTransactionCardViewModelMapper.map(await this.transactionService.getCards(idUser));
  }

  @Post()
  async create(
    @Param() { idUser }: TransactionParams,
    @Body() dto: TransactionCreateDto
  ): Promise<TransactionCardViewModel> {
    const transaction = await this.transactionService.create(idUser, dto);
    return TransactionEntityToTransactionCardViewModelMapper.map(await this.transactionService.getCard(transaction.id));
  }
}
