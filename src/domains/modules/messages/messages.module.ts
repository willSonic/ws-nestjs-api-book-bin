import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import {ConfigModule, ConfigService} from "../../../core/modules/config";
import {MessageSchema} from "./schema/message.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Message',
      schema:  MessageSchema
      }]),
    ConfigModule,
    ],
  providers: [MessagesService, ConfigService],
  exports:[MessagesService]
})
export class MessagesModule {}
