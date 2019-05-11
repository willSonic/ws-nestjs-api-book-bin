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
import {IUserResponse} from "../../user/interfaces/responses/iUser.response";

export class ProfileUpdateDTO {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiModelProperty()
  readonly id:string;



  @ValidateNested()
  @ApiModelProperty()
  readonly user:IUserResponse;


  @IsInt()
  @Max(5)
  @Min(0)
  @ApiModelProperty()
  readonly checkedOutCount?: number;


  @IsInt()
  @Max(10)
  @Min(0)
  @ApiModelProperty()
  readonly waitListCount?: number;


  @IsArray()
  @ApiModelProperty()
  readonly commentRefs?: string[];


  @IsArray()
  @ApiModelProperty()
  readonly messageRefs?: string[];


  @IsArray()
  @ApiModelProperty()
  readonly booksOut?: string[];


  @IsArray()
  @ApiModelProperty()
  readonly waitList?: string[];


  @IsArray()
  @ApiModelProperty()
  readonly interestCategories?: string[];
}
