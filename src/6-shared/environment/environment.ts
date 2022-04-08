import { config } from 'dotenv';
import { isNotNil } from 'st-utils';

import { EnvProp } from './env-prop.decorator';
import { environmentMetadata } from './environment.metadata';

function findEnvVar(names: string[]): string | undefined {
  for (const name of names) {
    if (isNotNil(process.env[name])) {
      return process.env[name];
    }
  }
}

export class Environment {
  private constructor() {
    if (process.env.NODE_ENV !== 'production') {
      config();
    }
    const entries = environmentMetadata.entries();
    const missingVariables: string[] = [];
    for (const [, metadata] of entries) {
      let value = findEnvVar(metadata.names) ?? metadata.defaultValue;
      if (!metadata.required || isNotNil(value)) {
        if (metadata.parser) {
          value = metadata.parser(value);
        }
      } else {
        missingVariables.push(metadata.names.join('/'));
      }
      (this as any)[metadata.propertyKey] = value;
    }
    if (missingVariables.length) {
      throw new Error('Missing required environment variables: \n' + missingVariables.join('\n'));
    }
    this.production = this.nodeEnv === 'production';
  }

  @EnvProp() nodeEnv!: string;
  @EnvProp({ defaultValue: 3000 }) port!: number;
  @EnvProp({ defaultValue: '127.0.0.0' }) host!: string;
  @EnvProp() dbPassword!: string;
  @EnvProp() dbUsername!: string;
  @EnvProp() dbDatabase!: string;
  @EnvProp() dbPort!: number;
  @EnvProp() dbHost!: string;

  production: boolean;

  private static instance?: Environment;
  static getInstance(): Environment {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new Environment());
  }
}
