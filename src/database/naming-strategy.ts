import { UnderscoreNamingStrategy } from '@mikro-orm/core';

export class NamingStrategy extends UnderscoreNamingStrategy {
  override classToTableName(entityName: string): string {
    return super.classToTableName(entityName.replace(/Entity$/, ''));
  }
}
