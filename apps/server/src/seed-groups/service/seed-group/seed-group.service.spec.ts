import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupService } from './seed-group.service';

describe('SeedGroupService', () => {
  let service: SeedGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedGroupService],
    }).compile();

    service = module.get<SeedGroupService>(SeedGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
