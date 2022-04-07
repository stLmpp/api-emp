import { snakeCase } from 'snake-case';
import { coerceArray, isString } from 'st-utils';

import { environmentMetadata, EnvPropertyMetadata } from './environment.metadata';

export interface EnvPropertyOptions {
  required?: boolean;
  name?: string | string[];
  parser?: (value: any) => any;
  defaultValue?: any;
}

const defaultParserMap = new Map<any, (value: any) => any>([
  [Number, value => Number(value)],
  [Boolean, value => (isString(value) ? value === 'true' : !!value)],
]);

export function EnvProp(options?: EnvPropertyOptions): PropertyDecorator {
  return (target, _propertyKey) => {
    const propertyKey = _propertyKey.toString();
    const name = coerceArray(options?.name ?? snakeCase(propertyKey).toUpperCase());
    const parser = options?.parser ?? defaultParserMap.get(Reflect.getMetadata('design:type', target, _propertyKey));
    environmentMetadata.add(
      propertyKey,
      new EnvPropertyMetadata(propertyKey, name, options?.required ?? true, options?.defaultValue, parser)
    );
  };
}
