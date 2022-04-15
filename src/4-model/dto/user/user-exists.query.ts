import { IsArray, IsOptional } from 'class-validator';

import { UserIdValidator } from './user-id.validator';

export class UserExistsQuery {
  @IsOptional()
  @IsArray()
  @UserIdValidator({ each: true })
  exclude?: string[];
}
