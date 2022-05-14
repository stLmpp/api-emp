import { IsOptional } from 'class-validator';

import { IsUserId } from '@model/validation/is-user-id';

export class UserUpdateDto {
  @IsOptional()
  @IsUserId()
  id?: string;
}
