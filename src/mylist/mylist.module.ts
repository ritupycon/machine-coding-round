import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyListController } from './controllers/mylist.controller';
import { MyListService } from './services/mylist.service';
import { MyListRepository } from './repositories/mylist.repository';
import { MyList, MyListSchema } from './schemas/mylist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'MyList',
        schema: MyListSchema
      }
    ]),
  ],
  controllers: [MyListController],
  providers: [MyListService, MyListRepository],
})
export class MyListModule {}
