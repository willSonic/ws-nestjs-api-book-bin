import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './domains/modules/authentication/authentication.module';
import { UserModule } from './domains/modules/user/user.module';
import { ProfilesModule } from './domains/modules/profiles/profiles.module';
import { BookedModule } from "./domains/modules/booked/booked.module";
import { BookedExpireEventsModule } from "./domains/modules/booked-expire-events/booked-expire-events.module";
import { BooksModule } from "./domains/modules/books/books.module";
import { MessagesModule } from "./domains/modules/messages/messages.module";
import { InventoryModule } from "./domains/modules/inventory/inventory.module";
import { CommentsModule } from "./domains/modules/comments/comments.module";
import { MongooseMongoDBModule } from "./core/modules/databases/mongoose/mongoose.module";

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    BookedModule,
    BookedExpireEventsModule,
    BooksModule,
    MessagesModule,
    InventoryModule,
    CommentsModule,
    MongooseMongoDBModule,
    ProfilesModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
