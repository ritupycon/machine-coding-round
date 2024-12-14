import { Controller, Get, Post, Delete, Body, Query, Param , ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MyListService } from '../services/mylist.service';
import { CreateMyListDto } from '../dtos/create-my-list.dto';


@ApiTags('My List')
@Controller('my-list')
export class MyListController {
    constructor(private readonly service: MyListService) {}

    @Post()
    @ApiResponse( { status: 201, description: 'Item added successfully.' })
    async create(@Body() dto: CreateMyListDto) {
        return this.service.cretaeItem(dto);
    }

    @Get()
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        return this.service.getItems(page, limit);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Item deleted successfully.'})
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.deleteItem(id);
    }
}