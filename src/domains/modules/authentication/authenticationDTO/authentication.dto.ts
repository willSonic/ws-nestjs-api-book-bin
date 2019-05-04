import {IsDefined, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthenticationLoginDTO{
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  @ApiModelProperty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(8)
  //@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
  @ApiModelProperty()
  readonly password: string;
}

