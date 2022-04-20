import { BaseRepository } from './base-repository';

import { TransactionItemEntity } from '@model/entity/transaction-item.entity';
import { IdGenerator } from '@shared/util/id-generator';

export class TransactionItemRepository extends BaseRepository<TransactionItemEntity> {
  async generateId(date: Date): Promise<string> {
    return new IdGenerator(date.toISOString(), id => this.exists(id)).generate();
  }
}
