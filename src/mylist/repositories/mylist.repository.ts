import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MyList, MyListDocument } from '../schemas/mylist.schema';

@Injectable()
export class MyListRepository {
    constructor(
        // Use the string 'MyList' instead of MyList.name
        @InjectModel('MyList') private readonly myListModel: Model<MyListDocument>,
      ) {}

  /**
   * Save a new item to the database
   * @param item The item data to be saved
   * @returns The saved MyList item
   */
  async save(item: Partial<MyList>): Promise<MyList> {
    const createdItem = new this.myListModel(item);
    return createdItem.save();
  }

  /**
   * Find an item by its title and type
   * @param title The title of the item
   * @param type The type of the item (e.g., Movie, TV Show)
   * @returns The found MyList item or null if not found
   */
  async findByTitleAndType(title: string, type: string): Promise<MyList | null> {
    return this.myListModel.findOne({ title, type }).exec();
  }

  /**
   * Find all items with pagination
   * @param skip The number of items to skip for pagination
   * @param limit The number of items to return for pagination
   * @returns A paginated list of MyList items with the total count
   */
  async findAllWithPagination(skip = 0, limit = 10): Promise<{ items: MyList[]; total: number }> {
    const [items, total] = await Promise.all([
      this.myListModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.myListModel.countDocuments().exec(),
    ]);
    return { items, total };
  }

  /**
   * Find an item by its ID
   * @param id The ID of the item
   * @returns The found MyList item or throws an exception if not found
   */
  async findById(id: string): Promise<MyList | null> {
    const item = await this.myListModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return item;
  }

  /**
   * Delete an item by its ID
   * @param id The ID of the item to be deleted
   * @returns A void response if the item was deleted
   */
  async deleteById(id: string): Promise<void> {
    const result = await this.myListModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
  }

  /**
   * Update an item by its ID
   * @param id The ID of the item to be updated
   * @param updateData The data to update the item with
   * @returns The updated MyList item
   */
  async updateById(id: string, updateData: Partial<MyList>): Promise<MyList | null> {
    const updatedItem = await this.myListModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied on update
    }).exec();
    
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return updatedItem;
  }
}
