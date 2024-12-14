import { BadRequestException } from '@nestjs/common';


export class DuplicateItemException extends BadRequestException {
    constructor() {
        super('Duplicate item already exists in your list.')
    }
}