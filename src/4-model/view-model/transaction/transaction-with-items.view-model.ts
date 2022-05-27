import { TransactionItemViewModel } from '@model/view-model/transaction-item/transaction-item.view-model';

export class TransactionWithItemsViewModel {
  constructor(props?: TransactionWithItemsViewModel) {
    Object.assign(this, props);
  }

  idTransaction!: string;
  idPerson!: string;
  personName!: string;
  name!: string;
  description?: string;
  date!: Date;
  total!: number;
  items!: TransactionItemViewModel[];
}
