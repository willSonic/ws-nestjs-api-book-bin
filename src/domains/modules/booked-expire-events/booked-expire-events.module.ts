import { Module } from '@nestjs/common';
import { BookedExpireEventsService } from './booked-expire-events.service';

@Module({
  providers: [BookedExpireEventsService]
})
export class BookedExpireEventsModule {}
