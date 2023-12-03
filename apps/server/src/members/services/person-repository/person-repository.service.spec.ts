import { Test, TestingModule } from '@nestjs/testing';
import { PersonRepositoryService } from './person-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('MemberRepositoryService', () => {
  let service: PersonRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonRepositoryService, PrismaService],
    }).compile();

    service = module.get<PersonRepositoryService>(PersonRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
