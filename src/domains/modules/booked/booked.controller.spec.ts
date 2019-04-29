import { Test, TestingModule } from '@nestjs/testing';
import { BookedController } from './booked.controller';

describe('Booked Controller', () => {
  let controller: BookedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookedController],
    }).compile();

    controller = module.get<BookedController>(BookedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
