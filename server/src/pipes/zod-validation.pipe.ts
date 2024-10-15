import {
  PipeTransform,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors
          .map((err) => `${err.path.join('.')} - ${err.message}`)
          .join(', ');
        throw new UnprocessableEntityException(
          `Validation failed: ${formattedErrors}`,
        );
      }
      throw new UnprocessableEntityException('Validation failed');
    }
  }
}
