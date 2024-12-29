import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestTimeLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        console.log(`Request took ${(endTime - startTime) / 1000} seconds`);
      }),
    );  }
}
