import { BadRequestException } from '@nestjs/common';

/**
 * Custom exception for handling cases where an item already exists in the list.
 */
export class DuplicateItemException extends BadRequestException {
  constructor(message: string = 'Duplicate item already exists in your list.') {
    super(message);
  }
}
