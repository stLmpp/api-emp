import { InternalServerErrorException } from '@nestjs/common';
import { isArray, round } from 'st-utils';

import { TransactionEntity } from '@model/entity/transaction.entity';
import { TransactionCardViewModel } from '@model/view-model/transaction/transaction-card.view-model';

export class TransactionEntityToTransactionCardViewModelMapper {
  private static _mapOne(transaction: TransactionEntity): TransactionCardViewModel {
    if (!transaction.person.isInitialized()) {
      throw new InternalServerErrorException(
        'TransactionEntityToTransactionCardViewModelMapper - transaction.person not initialized'
      );
    }
    if (!transaction.transactionItems.isInitialized()) {
      throw new InternalServerErrorException(
        'TransactionEntityToTransactionCardViewModelMapper - transaction.transactionItems not initialized'
      );
    }
    const viewModel = new TransactionCardViewModel({
      idTransaction: transaction.id,
      date: transaction.date,
      personName: transaction.person.getProperty('name'),
      description: transaction.description,
      totalReceived: 0,
      totalToReceive: 0,
      total: transaction.total,
      name: transaction.name,
      idPerson: transaction.person.getProperty('id'),
    });

    for (const transactionItem of transaction.transactionItems) {
      viewModel.totalReceived += transactionItem.value;
    }

    viewModel.totalToReceive = round(viewModel.total - viewModel.totalReceived);
    viewModel.totalReceived = round(viewModel.totalReceived);

    return viewModel;
  }

  static map(transactions: TransactionEntity[]): TransactionCardViewModel[];
  static map(transaction: TransactionEntity): TransactionCardViewModel;
  static map(
    transactionOrTransactions: TransactionEntity | TransactionEntity[]
  ): TransactionCardViewModel | TransactionCardViewModel[] {
    if (isArray(transactionOrTransactions)) {
      return transactionOrTransactions.map(this._mapOne);
    }
    return this._mapOne(transactionOrTransactions);
  }
}
