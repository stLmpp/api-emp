import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { coerceArray, isNotNil } from 'st-utils';

import { UserIdValidator } from './user-id.validator';

export class UserExistsQuery {
  @IsOptional()
  @IsArray()
  @UserIdValidator({ each: true })
  @Transform(({ value }) => isNotNil(value) && coerceArray(value))
  exclude?: string[];
}
