import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookedController } from './booked.controller';
import { BookedService } from './booked.service';
import {AuthenticationModule} from "../authentication/authentication.module";
import {ConfigModule, ConfigService} from "../../../core/modules/config";
import {UserModule} from "../user/user.module";
import { BookedSchema } from "./schema/booked.schema";

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    MongooseModule.forFeature([{
      name: 'Booked',
      schema:  BookedSchema
      }]),
    ConfigModule,
    ],
  controllers: [BookedController],
  providers: [BookedService, ConfigService ],
  exports:[BookedService]
})
export class BookedModule {}
