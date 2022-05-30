import { Logger as NestLogger } from '@nestjs/common';
import { isFunction, isObject, isString } from 'st-utils';
import { Class } from 'type-fest';

export class Logger {
  static create<T>(context?: string | Class<T> | T): NestLogger {
    let name: string | undefined;
    if (isString(context)) {
      name = context;
    } else if (isFunction(context) && context.name) {
      name = context.name;
    } else if (isObject(context)) {
      name = Object.getPrototypeOf(context)?.constructor?.name;
    }
    return name ? new NestLogger(name) : new NestLogger();
  }
}
