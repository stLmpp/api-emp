import { isArray } from 'st-utils';

import { TransactionItemEntity } from '@model/entity/transaction-item.entity';
import { TransactionItemViewModel } from '@model/view-model/transaction-item/transaction-item.view-model';

export class TransactionItemEntityTransactionItemViewModelMapper {
  private static _mapOne(transactionItemEntity: TransactionItemEntity): TransactionItemViewModel {
    return new TransactionItemViewModel(
      transactionItemEntity.id,
      transactionItemEntity.value,
      transactionItemEntity.date
    );
  }

  static map(transactionItem: TransactionItemEntity): TransactionItemViewModel;
  static map(transactionItems: TransactionItemEntity[]): TransactionItemViewModel[];
  static map(
    transactionItemOrTransactionItems: TransactionItemEntity | TransactionItemEntity[]
  ): TransactionItemViewModel | TransactionItemViewModel[] {
    if (isArray(transactionItemOrTransactionItems)) {
      return transactionItemOrTransactionItems.map(this._mapOne);
    }
    return this._mapOne(transactionItemOrTransactionItems);
  }
}
