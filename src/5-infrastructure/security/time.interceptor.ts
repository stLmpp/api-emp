import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { delayWhen, interval, Observable } from 'rxjs';
import { random } from 'st-utils';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(delayWhen(() => interval(random(25, 75))));
  }
}
