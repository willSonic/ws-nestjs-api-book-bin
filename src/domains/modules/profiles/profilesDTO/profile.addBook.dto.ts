import {
  IsNotEmpty,
  IsInt,
  IsArray,
  Max,
  Min,
  IsString,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { BooksCreateDTO } from "../../books/booksDTO/books.create.dto";

export class  ProfileAddBookDto{
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiModelProperty()
  readonly userId: string;


  @ValidateNested()
  @ApiModelProperty()
  readonly book: BooksCreateDTO;

}


