import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MyListRepository } from '../repositories/mylist.repository';
import { CreateMyListDto } from '../dtos/create-my-list.dto';
import { DuplicateItemException } from '../exceptions/duplicate-item.exception';
import { MyList } from '../schemas/mylist.schema'; // Import MyList interface


@Injectable()
export class MyListService {
  constructor(private readonly repository: MyListRepository) {}

  /**
   * Creates a new item in the list
   * @param dto The data transfer object containing item details
   * @returns The newly created item
   */
  async createItem(dto: CreateMyListDto) {
    // Check for duplicates based on the title and type
    const existingItem = await this.repository.findByTitleAndType(dto.title, dto.type);
    
    if (existingItem) {
      throw new DuplicateItemException(); // Throws a custom exception for duplicates
    }

    // Save the new item to the repository and return the created item
    return await this.repository.save(dto);
  }

  /**
   * Retrieves all items with pagination
   * @param page The page number (default is 1)
   * @param limit The number of items per page (default is 10)
   * @returns Paginated list of items and total count
   */
  async getItems(page: number = 1, limit: number = 10): Promise<{ items: MyList[]; total: number }> {
    const skip = (page - 1) * limit;
    const result = await this.repository.findAllWithPagination(skip, limit);

    return {
      items: result.items,
      total: result.total,
    };
  }

  /**
   * Deletes an item by ID
   * @param id The ID of the item to be deleted
   * @returns Success message or the deleted item details
   */
  async deleteItem(id: string): Promise<void> {
    const existingItem = await this.repository.findById(id);

    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }

    await this.repository.deleteById(id);
    return;
  }
}
