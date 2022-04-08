import { InternalServerErrorException } from '@nestjs/common';
import { Class } from 'type-fest';

export class MapProfileNotFoundError extends InternalServerErrorException {
  constructor(from: Class<any>, to: Class<any>) {
    super(`Map profile not found: From "${from.name}" to "${to.name}"`);
  }
}
