import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupService } from './seed-group.service';
import { SeedGroupRepositoryService } from '../seed-group-repository/seed-group-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('SeedGroupService', () => {
  let service: SeedGroupService;
  let repository: SeedGroupRepositoryService;

  const mockPrismaService = jest.mock('@/prisma/prisma.service');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedGroupService,
        SeedGroupRepositoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SeedGroupService>(SeedGroupService);
    repository = module.get<SeedGroupRepositoryService>(
      SeedGroupRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSeedGroupsByProgram', () => {
    it('should return seed groups', async () => {
      const seedGroups = [
        {
          id: 1,
          name: 'Seed Group 1',
          programId: 1,
          acronym: 'SG1',
          description: 'Seed Group 1 Description',
          researchGroupId: 1,
          researchLines: ['Seed Group 1 Research Line 1'],
        },
        {
          id: 2,
          name: 'Seed Group 2',
          programId: 1,
          acronym: 'SG2',
          description: 'Seed Group 2 Description',
          researchGroupId: 2,
          researchLines: ['Seed Group 2 Research Line 1'],
        },
        {
          id: 3,
          name: 'Seed Group 3',
          programId: 1,
          acronym: 'SG3',
          description: 'Seed Group 3 Description',
          researchGroupId: 3,
          researchLines: ['Seed Group 3 Research Line 1'],
        },
      ];

      jest
        .spyOn(repository, 'getSeedGroupsByProgramId')
        .mockResolvedValueOnce(seedGroups);

      expect(await service.getSeedGroupsByProgram(1)).toEqual(seedGroups);
    });

    it('should return empty array', async () => {
      jest
        .spyOn(repository, 'getSeedGroupsByProgramId')
        .mockResolvedValueOnce([]);

      expect(await service.getSeedGroupsByProgram(1)).toEqual([]);
    });
  });

  describe('getSeedGroupById', () => {
    it('should return seed group', async () => {
      const seedGroup = {
        id: 1,
        name: 'Seed Group 1',
        programId: 1,
        acronym: 'SG1',
        description: 'Seed Group 1 Description',
        researchGroupId: 1,
        researchLines: ['Seed Group 1 Research Line 1'],
      };

      jest
        .spyOn(repository, 'getSeedGroupById')
        .mockResolvedValueOnce(seedGroup);

      expect(await service.getSeedGroupById(1)).toEqual(seedGroup);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'getSeedGroupById').mockResolvedValueOnce(null);

      expect(await service.getSeedGroupById(1)).toBeNull();
    });
  });
});
