import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookedExpireEventsService } from './booked-expire-events.service';
import {BooksModule} from "../books/books.module";
import {ConfigModule, ConfigService} from "../../../core/modules/config";
import {BookedExpireEventSchema} from "./schema/bookedExpireEvent.schema";
import {InventoryService} from "../inventory/inventory.service";
import {MessagesService} from "../messages/messages.service";

@Module({
  imports: [
       BooksModule,
       ConfigModule,
       MongooseModule.forFeature([{
        name: 'BookedExpireEvent',
        schema:  BookedExpireEventSchema
        }]),
  ],
  providers: [BookedExpireEventsService, ConfigService],
  exports:[BookedExpireEventsService]
})
export class BookedExpireEventsModule {}
