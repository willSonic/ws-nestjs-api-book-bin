import {
    Length,
    IsNotEmpty,
    MaxLength,
    Matches,
    MinLength,
    IsString,
    IsBoolean,
    IsEmail,
    IsDefined, IsMongoId
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserUpdateDTO {

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly id:string;

  @IsString()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly userName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly admin: boolean;
}
