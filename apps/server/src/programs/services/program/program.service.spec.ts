import { Test, TestingModule } from '@nestjs/testing';
import { ProgramService } from './program.service';
import { ProgramRepositoryService } from '../program-repository/program-repository.service';

describe('ProgramService', () => {
  let service: ProgramService;
  let programRepository: ProgramRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramService, ProgramRepositoryService],
    }).compile();

    service = module.get<ProgramService>(ProgramService);
    programRepository = module.get<ProgramRepositoryService>(
      ProgramRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(programRepository).toBeDefined();
  });
});
