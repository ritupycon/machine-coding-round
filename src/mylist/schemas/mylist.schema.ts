import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export interface MyList {
    title: string;
    type: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Schema({ timestamps: true, collection: 'my-list' })
export class MyListDocument extends Document implements MyList {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    type: string;

    @Prop()
    description?: string;
}

export const MyListSchema = SchemaFactory.createForClass(MyListDocument);
