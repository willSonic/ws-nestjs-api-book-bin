import {
  IsNotEmpty,
  IsInt,
  IsArray,
  Max,
  Min,
  IsString,
  IsDefined,
  IsMongoId,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';



export class ProfileCreateDTO {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiModelProperty()
  readonly userId:string;

  @IsDefined()
  @IsInt()
  @Max(5)
  @Min(0)
  @ApiModelProperty()
  readonly checkedOutCount?: number;

  @IsDefined()
  @IsInt()
  @Max(10)
  @Min(0)
  @ApiModelProperty()
  readonly waitListCount?: number;

  @IsDefined()
  @IsArray()
  @ApiModelProperty()
  readonly commentRefs?:string[];


  @IsDefined()
  @IsArray()
  @ApiModelProperty()
  readonly messageRefs?: string[];


  @IsDefined()
  @IsArray()
  @ApiModelProperty()
  readonly booksOut?: string[];

  @IsDefined()
  @IsArray()
  @ApiModelProperty()
  readonly waitList?: string[];


  @IsDefined()
  @IsArray()
  @ApiModelProperty()
  readonly interestCategories?: string[];
}
