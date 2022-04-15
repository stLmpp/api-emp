import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidationOptions } from 'class-validator';

import { UserEntity } from '../../entity/user.entity';

export function UserIdValidator(options?: ValidationOptions): PropertyDecorator {
  return applyDecorators(
    IsString(options),
    IsNotEmpty(options),
    MaxLength(30, options),
    MinLength(3, options),
    Matches(UserEntity.idCheckRegexp, options)
  )
}
