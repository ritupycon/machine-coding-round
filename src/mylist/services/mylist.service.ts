import { Injectable, NotFoundException } from '@nestjs/common';
import { MyListRepository } from '../repositories/mylist.repository';
import { CreateMyListDto } from '../dtos/create-my-list.dto';
import { DuplicateItemException } from '../exceptions/duplicate-item.exception';


@Injectable()
export class MyListService {
    constructor(private readonly repository: MyListRepository) {}
  
    async cretaeItem(dto: CreateMyListDto) {
        // Check for duplicates based on the title and type

        const existingItem = await this.repository.findByTitleAndType(dto.title, dto.type);
        if (existingItem) {
            throw new DuplicateItemException()
        }
        return await this.repository.save(dto);
    }

    async getItems(page: number = 1, limit: number = 10) {
        const skip = ( page -1 ) * limit;
        return this.repository.findAllWithPagination(skip, limit);
    }

    async deleteItem(id: number) {
      const exitingItem = await this.repository.findById(id);
      if (!exitingItem) {
        throw new NotFoundException(`Item with ID ${id} not found.`);
      }
      await this.repository.deleteById(id);

      return {message: 'Item deleted succesfully'};
    }
}

