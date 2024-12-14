import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList, MyListDocument } from '../schemas/mylist.schema';


@Injectable()
export class MyListRepository {
    constructor(
      @InjectModel(MyList.name) private readonly myListModel: Model<MyListDocument>,
    ) {} 

    async save(item: Partial<MyList>): Promise<MyList> {
        const createdItem = new this.myListModel(item);
        return createdItem.save();
    }
    
    async findByTitleAndType(title: string, type: string): Promise<MyList | null>{
        return this.myListModel.findOne({ title, type }).exec();
    }

    async findAllWithPagination(skip: number, limit: number) {
        const [items, total ] = await Promise.all([
            this.myListModel.find().sort({
                createdAt: -1
            }).skip(skip).limit(limit).exec(),
            this.myListModel.countDocuments(),
        ]);
        return { items, total };
    }

    async findById(id: number): Promise<MyList | null> {
        return this.myListModel.findById(id).exec();
    }

    async deleteById(id: number): Promise<void> {
        await this.myListModel.findByIdAndDelete(id).exec();
    }

}