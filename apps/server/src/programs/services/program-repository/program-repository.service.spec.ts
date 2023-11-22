import { Test, TestingModule } from '@nestjs/testing';
import { ProgramRepositoryService } from './program-repository.service';

describe('ProgramRepositoryService', () => {
  let service: ProgramRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramRepositoryService],
    }).compile();

    service = module.get<ProgramRepositoryService>(ProgramRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
