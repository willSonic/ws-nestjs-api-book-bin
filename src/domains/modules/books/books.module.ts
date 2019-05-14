import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {AuthenticationModule} from "../authentication/authentication.module";
import {UserModule} from "../user/user.module";
import {BookedSchema} from "../booked/schema/booked.schema";
import {ConfigModule, ConfigService} from "../../../core/modules/config";
import {BookSchema} from "./schema/book.schema";
import {InventoryService} from "../inventory/inventory.service";

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    MongooseModule.forFeature([{
      name: 'Book',
      schema:  BookSchema
      }]),
    ConfigModule,
    ],
  controllers: [BooksController],
  providers: [BooksService, ConfigService],
  exports:[BooksService]
})
export class BooksModule {}
