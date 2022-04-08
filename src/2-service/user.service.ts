import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from '../3-repository/user.repository';
import { UserCreateDto } from '../4-model/dto/user-create.dto';
import { UserEntity } from '../4-model/entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllWithValues(): Promise<UserEntity[]> {
    return this.userRepository.getAllWithValues();
  }

  async create(dto: UserCreateDto): Promise<UserEntity> {
    if (await this.userRepository.exists({ name: dto.name })) {
      throw new ConflictException(`User with name "${dto.name}" already exists`);
    }
    const entity = new UserEntity().fromDto(dto);
    this.userRepository.persist(entity);
    await this.userRepository.flush();
    return entity;
  }
}
