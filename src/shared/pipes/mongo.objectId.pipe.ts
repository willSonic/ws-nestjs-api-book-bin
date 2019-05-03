import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata) {
    const validator = new Validator();
    const isValid = validator.isMongoId(value);

    if (!isValid) {
      throw new BadRequestException('Invalid ObjectID');
    }

    return value;
  }
}
