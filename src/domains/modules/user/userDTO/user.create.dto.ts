import {
  Length,
  IsNotEmpty,
  MaxLength,
  Matches,
  MinLength,
  IsString,
  IsBoolean,
  IsEmail,
  IsDefined
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserCreateDTO {

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly lastName: string;

  @IsString()
  @IsDefined()
  @Length(8)
  //@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
  @ApiModelProperty()
  readonly password:string;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

}
