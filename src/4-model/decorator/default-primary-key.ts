import { PrimaryKey } from '@mikro-orm/core';
import { applyDecorators } from '@nestjs/common';

import { DEFAULT_PRIMARY_KEY_LENGTH } from '@shared/constant/constant';

export function DefaultPrimaryKey(): PropertyDecorator {
  return applyDecorators(PrimaryKey({ length: DEFAULT_PRIMARY_KEY_LENGTH }) as PropertyDecorator);
}
