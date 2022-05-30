import {
  DatabaseObjectNotFoundException,
  DriverException,
  NotFoundError,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Class } from 'type-fest';

import { Logger } from '@infrastructure/logger/logger';

@Catch()
export class HandleErrorFilter extends BaseExceptionFilter {
  private readonly _logger = Logger.create(this);

  private readonly _fromOrmExceptionToHttpExceptionMap = new Map<
    Class<DriverException>,
    (exception: DriverException) => HttpException
  >()
    .set(UniqueConstraintViolationException, ({ message }) => new ConflictException(message))
    .set(DatabaseObjectNotFoundException, ({ message }) => new NotFoundException(message))
    .set(NotFoundError, ({ message }) => new NotFoundException(message));

  override catch(exception: unknown, host: ArgumentsHost): void {
    this._logger.error(exception);
    const applicationRef = this.applicationRef ?? this.httpAdapterHost?.httpAdapter;
    if (!applicationRef) {
      super.catch(exception, host);
      this._logger.error(exception);
      return;
    }
    let error: HttpException;
    if (this.isMikroOrmError(exception)) {
      error = this.handleMikroOrmError(exception);
    } else if (this.isThrownError(exception)) {
      error = this.handleThrownError(exception);
    } else {
      super.catch(exception, host);
      this._logger.error(exception);
      return;
    }
    const response = error.getResponse();
    const status = error.getStatus();
    this._logger.error(response);
    host.switchToHttp().getResponse().status(status).json(response);
  }

  isThrownError(exception: unknown): exception is HttpException {
    return exception instanceof HttpException;
  }

  handleThrownError(exception: HttpException): HttpException {
    return exception;
  }

  isMikroOrmError(exception: unknown): exception is DriverException {
    return exception instanceof DriverException;
  }

  handleMikroOrmError(exception: DriverException): HttpException {
    for (const [ormException, httpExceptionFactory] of this._fromOrmExceptionToHttpExceptionMap) {
      if (exception instanceof ormException) {
        return httpExceptionFactory(exception);
      }
    }
    return new InternalServerErrorException(exception.message);
  }
}
