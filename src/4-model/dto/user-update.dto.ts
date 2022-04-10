import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { UserEntity } from '../entity/user.entity';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  @Matches(UserEntity.idCheckRegexp)
  id?: string;
}
