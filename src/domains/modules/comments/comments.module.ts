import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
import {CommentSchema} from "./schema/comment.schema";
import {ConfigModule} from "../../../core/modules/config";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Comment',
      schema: CommentSchema
    }]),
    ConfigModule,
    ],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
