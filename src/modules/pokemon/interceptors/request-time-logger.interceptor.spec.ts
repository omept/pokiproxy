import { RequestTimeLoggerInterceptor } from './request-time-logger.interceptor';

describe('RequestLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new RequestTimeLoggerInterceptor()).toBeDefined();
  });
});
