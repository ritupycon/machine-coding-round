import { Document } from 'mongoose';


export interface MyListInterface extends Document {
    title: string;
    type: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}