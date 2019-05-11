import { Module } from '@nestjs/common';
import { BookedController } from './booked.controller';
import { BookedService } from './booked.service';

@Module({
  controllers: [BookedController],
  providers: [BookedService]
})
export class BookedModule {}
