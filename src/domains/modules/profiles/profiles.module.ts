import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfileSchema } from "./schema/profiles.schema";
import { AuthenticationModule} from "../authentication/authentication.module";
import {ConfigModule} from "../../../core/modules/config";

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([{ name: 'profiles', schema: ProfileSchema }]),
    ConfigModule,
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService]
})
export class ProfilesModule {

}
