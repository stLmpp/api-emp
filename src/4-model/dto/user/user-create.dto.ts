import { IsDefined } from 'class-validator';

import { IsUserId } from '@model/validation/is-user-id';

export class UserCreateDto {
  @IsDefined()
  @IsUserId()
  id!: string;
}
