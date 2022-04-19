import { Injectable } from '@nestjs/common';

import { TransactionEntity } from '@model/entity/transaction.entity';
import { TransactionRepository } from '@repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getCards(idUser: string): Promise<TransactionEntity[]> {
    return this.transactionRepository.find(
      {
        person: {
          userId: idUser,
        },
      },
      { populate: ['person', 'transactionItems'] }
    );
  }
}
