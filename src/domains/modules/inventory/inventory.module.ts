import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from "../../../core/modules/config";
import {InventorySchema} from "./schema/inventory.schema";
import {BooksService} from "../books/books.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Inventory',
      schema:  InventorySchema
      }]),
     ConfigModule,
    ],
  providers: [InventoryService, ConfigService],
  exports:[InventoryService]
})
export class InventoryModule {}
