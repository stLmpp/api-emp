import { wrap } from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';

import { TransactionCreateDto } from '@model/dto/transaction/transaction-create.dto';
import { TransactionUpdateDto } from '@model/dto/transaction/transaction-update.dto';
import { PersonEntity } from '@model/entity/person.entity';
import { TransactionEntity } from '@model/entity/transaction.entity';
import { PersonRepository } from '@repository/person.repository';
import { TransactionRepository } from '@repository/transaction.repository';
import { UserRepository } from '@repository/user.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly personRepository: PersonRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getCards(idUser: string): Promise<TransactionEntity[]> {
    return this.transactionRepository.find(
      { person: { user: { id: idUser } } },
      {
        populate: ['person', 'transactionItems'],
        orderBy: [{ date: 'DESC' }, { person: { name: 'ASC' } }, { total: 'DESC' }, { id: 'ASC' }],
      }
    );
  }

  async getCard(idTransaction: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOneOrFail(idTransaction, { populate: ['person', 'transactionItems'] });
  }

  async create(idUser: string, dto: TransactionCreateDto): Promise<TransactionEntity> {
    const user = await this.userRepository.findOneOrFail(idUser, { populate: ['people'] });
    let person: PersonEntity | undefined;
    if (dto.idPerson) {
      person = await this.personRepository.findOneOrFail(dto.idPerson, { populate: ['transactions'] });
    } else if (dto.personName) {
      const idPerson = await this.personRepository.generateId(idUser, dto.personName);
      person = new PersonEntity({
        id: idPerson,
        name: dto.personName,
        user,
      });
      user.people.add(person);
    }
    if (!person) {
      throw new BadRequestException('Could not get Person');
    }
    const idTransaction = await this.transactionRepository.generateId(idUser, dto.name);
    const transaction = new TransactionEntity({
      id: idTransaction,
      person,
      description: dto.description,
      name: dto.name,
      total: dto.total,
      date: dto.date,
      type: dto.type,
    });
    person.transactions.add(transaction);
    await this.userRepository.flush();
    return transaction;
  }

  async update(
    idUser: string,
    idTransaction: string,
    { idPerson, personName, ...dto }: TransactionUpdateDto
  ): Promise<TransactionEntity> {
    const transaction = await this.transactionRepository.findOneOrFail(idTransaction, { populate: ['person'] });
    const user = await this.userRepository.findOneOrFail(idUser, { populate: ['people'] });
    let newPerson: PersonEntity | null = null;
    if (idPerson) {
      if (idPerson !== transaction.person.getProperty('id')) {
        newPerson = await this.personRepository.findOneOrFail(idPerson);
      }
    } else if (personName) {
      if (personName !== transaction.person.getProperty('name')) {
        const newIdPerson = await this.personRepository.generateId(idUser, personName);
        newPerson = new PersonEntity({
          id: newIdPerson,
          name: personName,
          user,
        });
        user.people.add(newPerson);
      }
    }
    if (newPerson) {
      transaction.person = wrap(newPerson).toReference();
    }
    wrap(transaction).assign(dto);
    await this.transactionRepository.flush();
    return transaction;
  }

  async getWithItems(idTransaction: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOneOrFail(idTransaction, {
      populate: ['person', 'transactionItems'],
      orderBy: [{ transactionItems: { date: 'DESC' } }, { transactionItems: { id: 'ASC' } }],
    });
  }

  async delete(idTransaction: string): Promise<void> {
    const transaction = await this.transactionRepository.findOneOrFail(idTransaction, {
      populate: ['transactionItems'],
    });
    await this.transactionRepository.removeAndFlush(transaction);
  }
}
