import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, MaxLength, ValidationOptions } from 'class-validator';

import { DEFAULT_PRIMARY_KEY_LENGTH } from '@shared/constant/constant';

export function IsDefaultId(options?: ValidationOptions): PropertyDecorator {
  return applyDecorators(IsString(options), IsNotEmpty(options), MaxLength(DEFAULT_PRIMARY_KEY_LENGTH));
}
