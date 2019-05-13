import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookedController } from './booked.controller';
import { BookedService } from './booked.service';
import {AuthenticationModule} from "../authentication/authentication.module";
import {ConfigModule, ConfigService} from "../../../core/modules/config";
import {UserModule} from "../user/user.module";
import { BookedSchemaService} from "./schema/booked.schema.sevice";

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    MongooseModule.forFeature([{
      name: 'Booked',
      schema:  BookedSchemaService
      }]),
    ConfigModule,
    ],
  controllers: [BookedController],
  providers: [BookedService, ConfigService, BookedSchemaService],
  exports:[BookedService]
})
export class BookedModule {}
