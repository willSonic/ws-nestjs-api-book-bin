import { Test, TestingModule } from '@nestjs/testing';
import { BookedService } from './booked.service';

describe('BookedService', () => {
  let service: BookedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookedService],
    }).compile();

    service = module.get<BookedService>(BookedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
