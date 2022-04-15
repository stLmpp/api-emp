import { IsDefined } from 'class-validator';

import { UserIdValidator } from './user-id.validator';

export class UserCreateDto {
  @IsDefined()
  @UserIdValidator()
  id!: string;
}
