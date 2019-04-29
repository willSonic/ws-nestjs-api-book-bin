import { Test, TestingModule } from '@nestjs/testing';
import { BookedExpireEventsService } from './booked-expire-events.service';

describe('BookedExpireEventsService', () => {
  let service: BookedExpireEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookedExpireEventsService],
    }).compile();

    service = module.get<BookedExpireEventsService>(BookedExpireEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
