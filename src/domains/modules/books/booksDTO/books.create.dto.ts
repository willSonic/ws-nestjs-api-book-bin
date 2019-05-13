import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength
  } from "class-validator";

export class BooksCreateDTO{
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly googleId:string;

  @IsNotEmpty()
  @IsArray()
  @ApiModelProperty()
  readonly authors: string[];

  @IsInt()
  @ApiModelProperty()
  readonly averageRating?: number;

  @IsString()
  @MaxLength(1000)
  @ApiModelProperty()
  readonly description?: string ;


  @ApiModelProperty()
  readonly imageLinks?:  {};


  @IsInt()
  @ApiModelProperty()
  readonly pageCount?: number;

  @IsString()
  @ApiModelProperty()
  readonly subtitle?: string;

  @IsString()
  @ApiModelProperty()
  readonly title?: string;

  @IsArray()
  @ApiModelProperty()
  readonly categories?: string[];

  @IsInt()
  @ApiModelProperty()
  readonly ratingsCount?: number;

  @IsDateString()
  @ApiModelProperty()
  readonly publishedDate?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly publisher: string;
}
