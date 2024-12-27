import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value >= 0 ? value : 0;
  }
}
