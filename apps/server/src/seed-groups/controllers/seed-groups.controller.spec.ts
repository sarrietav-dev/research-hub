import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupsController } from './seed-groups.controller';
import { SeedGroupService } from '../service/seed-group/seed-group.service';
import { SeedGroupRepositoryService } from '../service/seed-group-repository/seed-group-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('SeedGroupsController', () => {
  let controller: SeedGroupsController;
  let service: SeedGroupService;
  let app: INestApplication;

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
      controllers: [SeedGroupsController],
    }).compile();

    module.useLogger(false);

    controller = module.get<SeedGroupsController>(SeedGroupsController);
    service = module.get<SeedGroupService>(SeedGroupService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSeedGroups', () => {
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
        programId: 2,
        acronym: 'SG3',
        description: 'Seed Group 3 Description',
        researchGroupId: 3,
        researchLines: ['Seed Group 3 Research Line 1'],
      },
      {
        id: 4,
        name: 'Seed Group 4',
        programId: 2,
        acronym: 'SG4',
        description: 'Seed Group 4 Description',
        researchGroupId: 4,
        researchLines: ['Seed Group 4 Research Line 1'],
      },
      {
        id: 5,
        name: 'Seed Group 5',
        programId: 3,
        acronym: 'SG5',
        description: 'Seed Group 5 Description',
        researchGroupId: 5,
        researchLines: ['Seed Group 5 Research Line 1'],
      },
      {
        id: 6,
        name: 'Seed Group 6',
        programId: 3,
        acronym: 'SG6',
        description: 'Seed Group 6 Description',
        researchGroupId: 6,
        researchLines: ['Seed Group 6 Research Line 1'],
      },
    ];

    beforeEach(() => {
      jest.spyOn(service, 'getSeedGroups').mockResolvedValue(seedGroups);
      jest
        .spyOn(service, 'getSeedGroupsByProgram')
        .mockImplementation(async (programId: number) =>
          seedGroups.filter((seedGroup) => seedGroup.programId == programId),
        );
    });

    it('should return seed groups', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups')
        .expect(200);

      expect(results.body).toEqual(seedGroups);
    });

    it('should return seed groups by program', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups')
        .query({ programId: 1 })
        .expect(200);

      expect(results.body).toEqual([
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
      ]);
    });

    it('should return empty array', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups')
        .query({ programId: 4 })
        .expect(200);

      expect(results.body).toEqual([]);
    });

    it('should return 400 error', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups')
        .query({ programId: 'test' })
        .expect(400);

      expect(results.body).toEqual({
        statusCode: 400,
        message: 'programId must be a number',
        error: 'Bad Request',
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
