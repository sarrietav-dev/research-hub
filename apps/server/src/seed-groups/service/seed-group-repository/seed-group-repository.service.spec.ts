import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupRepositoryService } from './seed-group-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('SeedGroupRepositoryService', () => {
  let service: SeedGroupRepositoryService;

  const mockPrismaService = jest.mock('@/prisma/prisma.service');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedGroupRepositoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SeedGroupRepositoryService>(
      SeedGroupRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
