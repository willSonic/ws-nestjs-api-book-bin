import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {AuthenticationModule} from "../authentication/authentication.module";
import {UserSchema} from "./schema/user.schema";
import {ConfigModule} from "../../../core/modules/config/config.module";

@Module({
  imports: [
    forwardRef(() => AuthenticationModule),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    ConfigModule,
    ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
