import { wrap } from '@mikro-orm/core';
import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from '../3-repository/user.repository';
import { UserCreateDto } from '../4-model/dto/user-create.dto';
import { UserUpdateDto } from '../4-model/dto/user-update.dto';
import { UserEntity } from '../4-model/entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllWithValues(): Promise<UserEntity[]> {
    return this.userRepository.findAll({
      populate: ['people', 'people.transactions', 'people.transactions.transactionItems'],
    });
  }

  async create(dto: UserCreateDto): Promise<UserEntity> {
    if (await this.userRepository.exists({ id: dto.id })) {
      throw new ConflictException(`User with name "${dto.id}" already exists`);
    }
    const entity = wrap(new UserEntity()).assign(dto);
    await this.userRepository.persistAndFlush(entity);
    return entity;
  }

  async update(id: string, dto: UserUpdateDto): Promise<UserEntity> {
    const entity = await this.userRepository.findOneOrFail(id);
    wrap(entity).assign(dto);
    await this.userRepository.flush();
    return entity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.userRepository.findOneOrFail(id);
    await this.userRepository.remove(entity).flush();
  }

  async exists(id: string): Promise<boolean> {
    return this.userRepository.exists(id);
  }
}
