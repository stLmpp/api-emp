import { DriverException, UniqueConstraintViolationException } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Class } from 'type-fest';

import { Environment } from '../../6-shared/environment/environment';

@Catch()
export class HandleErrorFilter extends BaseExceptionFilter {
  constructor(private readonly environment: Environment) {
    super();
  }

  override catch(exception: any, host: ArgumentsHost): void {
    const applicationRef = this.applicationRef ?? this.httpAdapterHost?.httpAdapter;
    if (!applicationRef) {
      super.catch(exception, host);
      if (!this.environment.production) {
        Logger.error(exception);
      }
      return;
    }
    let error: HttpException;
    // TODO when bad request modify to not send array as messages
    if (this.isMikroOrmError(exception)) {
      error = this.handleMikroOrmError(exception);
    } else if (this.isThrownError(exception)) {
      error = this.handleThrownError(exception);
    } else {
      super.catch(exception, host);
      if (!this.environment.production) {
        Logger.error(exception);
      }
      return;
    }
    const response = error.getResponse();
    const status = error.getStatus();
    if (!this.environment.production) {
      Logger.error(response);
    }
    host.switchToHttp().getResponse().status(status).json(response);
  }

  isThrownError(exception: any): exception is HttpException {
    return exception instanceof HttpException;
  }

  handleThrownError(exception: HttpException): HttpException {
    return exception;
  }

  isMikroOrmError(exception: any): exception is DriverException {
    return exception instanceof DriverException;
  }

  handleMikroOrmError(exception: DriverException): HttpException {
    const map = new Map<Class<DriverException>, (exception: DriverException) => HttpException>().set(
      UniqueConstraintViolationException,
      () => new ConflictException()
    );
    for (const [ormException, httpExceptionFactory] of map) {
      if (exception instanceof ormException) {
        return httpExceptionFactory(exception);
      }
    }
    return new InternalServerErrorException(exception.message);
  }
}
