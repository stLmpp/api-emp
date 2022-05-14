import { wrap } from '@mikro-orm/core';
import { ConflictException, Injectable } from '@nestjs/common';

import { UserCreateDto } from '@model/dto/user/user-create.dto';
import { UserUpdateDto } from '@model/dto/user/user-update.dto';
import { UserEntity } from '@model/entity/user.entity';
import { UserRepository } from '@repository/user.repository';

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
    const entity = new UserEntity({ id: dto.id });
    await this.userRepository.persistAndFlush(entity);
    return entity;
  }

  async update(id: string, dto: UserUpdateDto): Promise<UserEntity> {
    const entity = await this.userRepository.findOneOrFail(id);
    wrap(entity).assign(dto);
    await this.userRepository.nativeUpdate(id, dto);
    return entity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.userRepository.findOneOrFail(id);
    await this.userRepository.removeAndFlush(entity);
  }

  async exists(id: string, exclude?: string[]): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder('user').select('id').andWhere({ id });
    if (exclude?.length) {
      query.andWhere({ id: { $nin: exclude } });
    }
    const user = await query.getSingleResult();
    return !!user;
  }

  async getById(idUser: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail(idUser);
  }
}
