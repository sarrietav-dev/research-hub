import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

@Injectable()
export class ValidateInputPipe<T extends ZodRawShape> implements PipeTransform {
  constructor(private schema: ZodObject<T>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedError = error.flatten().fieldErrors;
        throw new BadRequestException(formattedError);
      } else {
        throw error;
      }
    }
  }
}
