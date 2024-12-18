import { Controller, Get, Post, Delete, Body, Query, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MyListService } from '../services/mylist.service';
import { CreateMyListDto } from '../dtos/create-my-list.dto';
import { MyList } from '../schemas/mylist.schema';


@ApiTags('My List')
@Controller('my-list')
export class MyListController {
  constructor(private readonly service: MyListService) {}

  /**
   * Create a new item in the list.
   * @param dto Data transfer object for creating a new item.
   * @returns Newly created item.
   */
    @Post()
    @ApiResponse({ status: 201, description: 'Item added successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    async create(@Body() dto: CreateMyListDto): Promise<MyList> {
        try {
        return await this.service.createItem(dto);
        } catch (error) {
        throw new BadRequestException('Error creating item: ' + error.message);
        }
    }

  /**
   * Get all items with pagination support.
   * @param page The page number for pagination.
   * @param limit The number of items per page.
   * @returns List of items.
   */
    @Get()
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @ApiResponse({ status: 200, description: 'List of items retrieved successfully.' })
    async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        const result = await this.service.getItems(page, limit);
        return result;
    }

  /**
   * Delete an item by its ID.
   * @param id The ID of the item to delete.
   * @returns A success message or an error if the item doesn't exist.
   */
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Item deleted successfully.'})
    async delete(@Param('id') id: string) {
        // Convert the number to a string before passing it to the service
        const idAsString = id.toString();
        const item = await this.service.deleteItem(idAsString);
        return { message: 'Item deleted successfully' };
    }

}
