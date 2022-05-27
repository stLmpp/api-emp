import { BaseRepository } from './base-repository';

import { TransactionItemEntity } from '@model/entity/transaction-item.entity';
import { IdGenerator } from '@shared/util/id-generator';

export class TransactionItemRepository extends BaseRepository<TransactionItemEntity> {
  async generateId(idTransaction: string, date: Date): Promise<string> {
    const idString = `${idTransaction.slice(0, 5)}${date.toISOString()}${idTransaction.slice(5)}`;
    return new IdGenerator(idString, id => this.exists(id)).generate();
  }
}
