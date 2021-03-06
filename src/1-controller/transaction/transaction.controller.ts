import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TransactionCreateDto } from '@model/dto/transaction/transaction-create.dto';
import { TransactionDeleteParams } from '@model/dto/transaction/transaction-delete.params';
import { TransactionUpdateDto } from '@model/dto/transaction/transaction-update.dto';
import { TransactionUpdateParams } from '@model/dto/transaction/transaction-update.params';
import { TransactionWithItemsParams } from '@model/dto/transaction/transaction-with-items.params';
import { TransactionParams } from '@model/dto/transaction/transaction.params';
import { TransactionEntityToTransactionCardViewModelMapper } from '@model/mapping/transaction/transaction.entity-to-transaction-card.view-model.mapper';
import { TransactionEntityToTransactionWithItemsViewModelMapper } from '@model/mapping/transaction/transaction.entity-to-transaction-with-items.view-model.mapper';
import { TransactionCardViewModel } from '@model/view-model/transaction/transaction-card.view-model';
import { TransactionWithItemsViewModel } from '@model/view-model/transaction/transaction-with-items.view-model';
import { TransactionService } from '@service/transaction/transaction.service';
import { RouteParamEnum } from '@shared/route/route-param.enum';

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

  @Patch(`:${RouteParamEnum.idTransaction}`)
  async update(
    @Param() { idUser, idTransaction }: TransactionUpdateParams,
    @Body() dto: TransactionUpdateDto
  ): Promise<TransactionCardViewModel> {
    await this.transactionService.update(idUser, idTransaction, dto);
    return TransactionEntityToTransactionCardViewModelMapper.map(await this.transactionService.getCard(idTransaction));
  }

  @Get(`:${RouteParamEnum.idTransaction}/with/items`)
  async getWithItems(@Param() { idTransaction }: TransactionWithItemsParams): Promise<TransactionWithItemsViewModel> {
    return TransactionEntityToTransactionWithItemsViewModelMapper.map(
      await this.transactionService.getWithItems(idTransaction)
    );
  }

  @Delete(`:${RouteParamEnum.idTransaction}`)
  async delete(@Param() { idTransaction }: TransactionDeleteParams): Promise<void> {
    await this.transactionService.delete(idTransaction);
  }
}
