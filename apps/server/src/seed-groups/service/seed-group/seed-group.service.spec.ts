import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupService } from './seed-group.service';
import { SeedGroupRepositoryService } from '../seed-group-repository/seed-group-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as mockData from './test-mock-data';

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
      const seedGroups = mockData.getSeedGroupsByProgramData;

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
      const seedGroup: Awaited<ReturnType<typeof repository.getSeedGroupById>> =
        {
          id: 1,
          name: 'Seed Group 1',
          programId: 1,
          acronym: 'SG1',
          description: 'Seed Group 1 Description',
          researchGroupId: 1,
          researchLines: ['Seed Group 1 Research Line 1'],
          creationDate: new Date(),
          projects: [
            {
              id: 1,
              name: 'Project 1',
              approvedAmount: 1000,
              startDate: new Date(),
              endDate: new Date(),
              certifyingOrganizationId: 1,
              type: 'Finished',
              seedGroupId: 1,
              certifyingOrganization: {
                id: 1,
                name: 'Certifying Organization 1',
              },
              products: [
                {
                  id: 1,
                  name: 'Product 1',
                  description: 'Product 1 Description',
                  projectId: 1,
                  date: new Date(),
                  type: 'Article',
                },
              ],
            },
          ],
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

  describe('getLatestMembers', () => {
    it('should return latest members', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      jest
        .spyOn(repository, 'getLatestMembersBySeedGroupId')
        .mockResolvedValueOnce(mockData.getLatestMembersData);

      expect((await service.getLatestMembers(1)).length).toBe(3);
    });

    it('should return empty array', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      jest
        .spyOn(repository, 'getLatestMembersBySeedGroupId')
        .mockResolvedValueOnce([]);

      expect(await service.getLatestMembers(1)).toEqual([]);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(false);

      expect(await service.getLatestMembers(1)).toBeNull();
    });
  });

  describe('getMembersAtPeriod', () => {
    beforeEach(() => {
      jest
        .spyOn(repository, 'getMembersAtPeriod')
        .mockImplementationOnce(async (seedGroupId: number, period: string) => {
          const data = mockData.getMembersAtPeriodData;
          return data.filter(
            (member) =>
              member.period === period && member.seedGroupId == seedGroupId,
          );
        });
    });

    it('should return members at period', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      expect(await service.getMembersAtPeriod(1, '2023-1')).toEqual(
        mockData.getMembersAtPeriodData.slice(0, 2),
      );
    });

    it('should return empty array', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      expect(await service.getMembersAtPeriod(2, '2022-2')).toEqual([]);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(false);

      expect(await service.getMembersAtPeriod(1, '2023-1')).toBeNull();
    });
  });

  describe('getProjects', () => {
    it('should return projects', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      jest
        .spyOn(repository, 'getProjectsBySeedGroupId')
        .mockResolvedValueOnce(mockData.getProjectsData);

      expect(await service.getProjects(1)).toEqual(mockData.getProjectsData);
    });

    it('should return empty array', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      jest
        .spyOn(repository, 'getProjectsBySeedGroupId')
        .mockResolvedValueOnce([]);

      expect(await service.getProjects(1)).toEqual([]);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(false);

      expect(await service.getProjects(1)).toBeNull();
    });
  });

  describe('getEvents', () => {
    it('should return events', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      jest
        .spyOn(repository, 'getEventsBySeedGroupId')
        .mockResolvedValueOnce(mockData.getEventsData);

      expect(await service.getEvents(1)).toEqual(mockData.getEventsData);
    });

    it('should return empty array', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(true);

      jest
        .spyOn(repository, 'getEventsBySeedGroupId')
        .mockResolvedValueOnce([]);

      expect(await service.getEvents(1)).toEqual([]);
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'doesSeedGroupExist').mockResolvedValue(false);

      expect(await service.getEvents(1)).toBeNull();
    });
  });
});
