import { Test, TestingModule } from '@nestjs/testing';
import { Profiles } from './profiles';

describe('Profiles', () => {
  let provider: Profiles;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Profiles],
    }).compile();

    provider = module.get<Profiles>(Profiles);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
