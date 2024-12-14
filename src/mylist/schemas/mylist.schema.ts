import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type MyListDocument = MyList & Document;

@Schema({ timestamps: true, collection: 'my-list'})
export class MyList {
    @Prop({ required: true, unique: true})
    title: string;

    @Prop({ required: true })
    type: string;

    @Prop()
    description?: string
}

export const MyListSchema = SchemaFactory.createForClass(MyList);
