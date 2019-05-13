import {
  IsNotEmpty,
  IsString,
  IsMongoId,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ProfileAddToWaitListDto{

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiModelProperty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiModelProperty()
  readonly inventoryId: string;

}
