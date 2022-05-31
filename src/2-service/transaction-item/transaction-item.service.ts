import { Injectable } from '@nestjs/common';

import { TransactionItemCreateDto } from '@model/dto/transaction-item/transaction-item-create.dto';
import { TransactionItemEntity } from '@model/entity/transaction-item.entity';
import { TransactionItemRepository } from '@repository/transaction-item.repository';
import { TransactionRepository } from '@repository/transaction.repository';

@Injectable()
export class TransactionItemService {
  constructor(
    private readonly transactionItemRepository: TransactionItemRepository,
    private readonly transactionRepository: TransactionRepository
  ) {}

  async create(idTransaction: string, dto: TransactionItemCreateDto): Promise<TransactionItemEntity> {
    const transaction = await this.transactionRepository.findOneOrFail(idTransaction, {
      populate: ['transactionItems'],
    });
    const id = await this.transactionItemRepository.generateId(idTransaction, dto.date);
    const transactionItem = new TransactionItemEntity(id, dto.value, dto.date, transaction);
    transaction.transactionItems.add(transactionItem);
    await this.transactionRepository.flush();
    return transactionItem;
  }

  async delete(idTransactionItem: string): Promise<void> {
    const transactionItem = await this.transactionItemRepository.findOneOrFail(idTransactionItem);
    await this.transactionItemRepository.removeAndFlush(transactionItem);
  }
}
