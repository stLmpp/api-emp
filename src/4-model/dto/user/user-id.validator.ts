import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidationOptions } from 'class-validator';
import { isArray, isNil, uniq } from 'st-utils';

import { UserEntity } from '../../entity/user.entity';

export function UserIdValidator(options?: ValidationOptions): PropertyDecorator {
  return applyDecorators(
    IsString(options),
    IsNotEmpty(options),
    MaxLength(30, options),
    MinLength(3, options),
    Matches(UserEntity.idCheckRegexp, options),
    Transform(({ value }) => {
      if (isNil(value)) {
        return value;
      }
      if (options?.each && isArray(value)) {
        return uniq(value).map(val => val?.toLowerCase?.() ?? val);
      }
      return value.toLowerCase?.() ?? value;
    })
  );
}
