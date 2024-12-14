import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';


export class CreateMyListDto {
    @ApiProperty({ description : 'Title of the list item', example: 'My Movie'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description : 'Type of the list item', example: 'Movie'})
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({ description : 'Optional Description', example: 'A Great Movie'})
    @IsOptional()
    @IsString()
    description?: string;
}