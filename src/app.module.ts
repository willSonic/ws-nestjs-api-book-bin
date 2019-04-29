import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './domains/modules/books/books.module';
import { Books } from './books';
import { AuthenticationModule } from './domains/modules/authentication/authentication.module';
import { ProfilesModule } from './domains/modules/profiles/profiles.module';
import { PorfilesController } from './porfiles/porfiles.controller';
import { Profiles } from './profiles';
import { UsersModule } from './domains/modules/users/users.module';
import { Users } from './users';
import { BookedModule } from './domains/modules/booked/booked.module';
import { InvetoriesModule } from './invetories/invetories.module';
import { InventoryModule } from './domains/modules/inventory/inventory.module';
import { MessagesModule } from './domains/modules/messages/messages.module';
import { CommentsModule } from './domains/modules/comments/comments.module';
import { BookedExpireEventsModule } from './domains/modules/booked-expire-events/booked-expire-events.module';

@Module({
  imports: [BooksModule, AuthenticationModule, ProfilesModule, UsersModule, BookedModule, InvetoriesModule, InventoryModule, MessagesModule, CommentsModule, BookedExpireEventsModule],
  controllers: [AppController, PorfilesController],
  providers: [AppService, Books, Profiles, Users],
})
export class AppModule {}
