import { Document } from 'mongoose';

/**
 * Enum for possible list item types (e.g., Movie, TV Show)
 */
export enum ListItemType {
  Movie = 'Movie',
  TVShow = 'TV Show',
  Documentary = 'Documentary',
}

export interface MyListInterface extends Document {
  title: string;
  type: ListItemType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
