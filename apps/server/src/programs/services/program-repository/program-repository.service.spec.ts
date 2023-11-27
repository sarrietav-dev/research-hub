import { Test, TestingModule } from '@nestjs/testing';
import { ProgramRepositoryService } from './program-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('ProgramRepositoryService', () => {
  let service: ProgramRepositoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramRepositoryService, PrismaService],
    }).compile();

    service = module.get<ProgramRepositoryService>(ProgramRepositoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
