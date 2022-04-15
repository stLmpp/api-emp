import { IsOptional } from 'class-validator';

import { UserIdValidator } from './user-id.validator';

export class UserUpdateDto {
  @IsOptional()
  @UserIdValidator()
  id?: string;
}
