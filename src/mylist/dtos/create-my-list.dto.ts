import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';

/**
 * Enum for possible list item types (e.g., Movie, TV Show, Documentary)
 */
export enum ListItemType {
  Movie = 'Movie',
  TVShow = 'TV Show',
  Documentary = 'Documentary',
}

export class CreateMyListDto {
  @ApiProperty({
    description: 'Title of the list item',
    example: 'My Movie',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Type of the list item (e.g., Movie, TV Show, Documentary)',
    example: 'Movie',
    enum: ListItemType,
  })
  @IsNotEmpty()
  @IsEnum(ListItemType)
  type: ListItemType;

  @ApiProperty({
    description: 'Optional description of the list item',
    example: 'A Great Movie',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
