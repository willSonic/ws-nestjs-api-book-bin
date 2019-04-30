import { Module } from '@nestjs/common';
import { JwtStrategy } from  './strategies/jwt.strategy'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {ConfigModule} from "../../../core/modules/config/config.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    ConfigModule,
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [AuthenticationService, JwtStrategy]
})
export class AuthenticationModule {}
