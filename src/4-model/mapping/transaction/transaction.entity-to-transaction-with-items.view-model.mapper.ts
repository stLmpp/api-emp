import { InternalServerErrorException } from '@nestjs/common';
import { isArray } from 'st-utils';

import { TransactionEntity } from '@model/entity/transaction.entity';
import { TransactionItemViewModel } from '@model/view-model/transaction-item/transaction-item.view-model';
import { TransactionWithItemsViewModel } from '@model/view-model/transaction/transaction-with-items.view-model';

export class TransactionEntityToTransactionWithItemsViewModelMapper {
  private static _mapOne(transaction: TransactionEntity): TransactionWithItemsViewModel {
    if (!transaction.transactionItems.isInitialized()) {
      throw new InternalServerErrorException(
        'TransactionEntityToTransactionWithItemsViewModelMapper - transaction.transactionItems not initialized'
      );
    }
    if (!transaction.person.isInitialized()) {
      throw new InternalServerErrorException(
        'TransactionEntityToTransactionWithItemsViewModelMapper - transaction.person not initialized'
      );
    }
    const transactionItems = transaction.transactionItems
      .toArray()
      .map(item => new TransactionItemViewModel(item.id, item.value, item.date));
    return new TransactionWithItemsViewModel({
      idTransaction: transaction.id,
      date: transaction.date,
      personName: transaction.person.getProperty('name'),
      name: transaction.name,
      idPerson: transaction.person.getProperty('id'),
      description: transaction.description,
      total: transaction.total,
      items: transactionItems,
    });
  }

  static map(transaction: TransactionEntity): TransactionWithItemsViewModel;
  static map(transactions: TransactionEntity[]): TransactionWithItemsViewModel[];
  static map(
    transactionOrTransactions: TransactionEntity | TransactionEntity[]
  ): TransactionWithItemsViewModel | TransactionWithItemsViewModel[] {
    if (isArray(transactionOrTransactions)) {
      return transactionOrTransactions.map(this._mapOne);
    }
    return this._mapOne(transactionOrTransactions);
  }
}
