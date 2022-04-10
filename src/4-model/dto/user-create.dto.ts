import { IsDefined, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { UserEntity } from '../entity/user.entity';

export class UserCreateDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(UserEntity.idCheckRegexp)
  id!: string;
}
