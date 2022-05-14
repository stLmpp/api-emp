import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { coerceArray, isNotNil } from 'st-utils';

import { IsUserId } from '@model/validation/is-user-id';

export class UserExistsQuery {
  @IsOptional()
  @IsArray()
  @IsUserId({ each: true })
  @Transform(({ value }) => isNotNil(value) && coerceArray(value))
  exclude?: string[];
}
