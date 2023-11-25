import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupsController } from './seed-groups.controller';
import { SeedGroupService } from '../service/seed-group/seed-group.service';
import { SeedGroupRepositoryService } from '../service/seed-group-repository/seed-group-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as request from 'supertest';
import * as mockData from './test-mock-data';
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
    const seedGroups = mockData.getSeedGroupsData;

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

      expect(results.body).toEqual(
        seedGroups.map((seedGroup) => ({
          ...seedGroup,
          projects: seedGroup.projects.map((project) => ({
            ...project,
            startDate: expect.any(String),
            endDate: expect.any(String),
            products: project.products.map((product) => ({
              ...product,
              date: expect.any(String),
            })),
          })),
        })),
      );
    });

    it('should return seed groups by program', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups')
        .query({ programId: 1 })
        .expect(200);

      expect(results.body).toEqual(
        seedGroups.slice(0, 2).map((seedGroup) => ({
          ...seedGroup,
          projects: seedGroup.projects.map((project) => ({
            ...project,
            startDate: expect.any(String),
            endDate: expect.any(String),
            products: project.products.map((product) => ({
              ...product,
              date: expect.any(String),
            })),
          })),
        })),
      );
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

  describe('getSeedGroupById', () => {
    const seedGroup: Awaited<ReturnType<typeof service.getSeedGroupById>> = {
      id: 1,
      name: 'Seed Group 1',
      programId: 1,
      acronym: 'SG1',
      description: 'Seed Group 1 Description',
      researchGroupId: 1,
      researchLines: ['Seed Group 1 Research Line 1'],
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

    beforeEach(() => {
      jest.spyOn(service, 'getSeedGroupById').mockResolvedValue(seedGroup);
    });

    it('should return seed group', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1')
        .expect(200);

      expect(results.body).toEqual({
        ...seedGroup,
        projects: seedGroup.projects.map((project) => ({
          ...project,
          startDate: expect.any(String),
          endDate: expect.any(String),
          products: project.products.map((product) => ({
            ...product,
            date: expect.any(String),
          })),
        })),
      });
    });

    it('should return 404 error', async () => {
      jest.spyOn(service, 'getSeedGroupById').mockResolvedValue(null);

      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1')
        .expect(404);

      expect(results.body).toEqual({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    });

    it('should return 400 error', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/test')
        .expect(400);

      expect(results.body).toEqual({
        statusCode: 400,
        message: 'id must be a number',
        error: 'Bad Request',
      });
    });
  });

  describe('getMembers', () => {
    beforeEach(() => {
      jest
        .spyOn(service, 'getLatestMembers')
        .mockResolvedValue(mockData.getMembersData);
    });

    it('should return latest members', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1/members')
        .expect(200);

      expect(results.body).toEqual(
        mockData.getMembersData.map((data) => ({
          ...data,
          affiliationDate: expect.any(String),
        })),
      );
    });

    it('should return 400 error', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/test/members')
        .expect(400);

      expect(results.body).toEqual({
        statusCode: 400,
        message: 'id must be a number',
        error: 'Bad Request',
      });
    });

    it('should return 404 error', async () => {
      jest.spyOn(service, 'getLatestMembers').mockResolvedValue(null);

      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1/members')
        .expect(404);

      expect(results.body).toEqual({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    });

    it('should return empty array', async () => {
      jest.spyOn(service, 'getLatestMembers').mockResolvedValue([]);

      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1/members')
        .expect(200);

      expect(results.body).toEqual([]);
    });
  });

  describe('getMembersAtPeriod', () => {
    beforeEach(() => {
      jest
        .spyOn(service, 'getMembersAtPeriod')
        .mockImplementation(async (seedGroupId: number, period: string) => {
          const data = mockData.getMembersAtPeriodData;
          return data.filter(
            (member) =>
              member.period === period && member.seedGroupId == seedGroupId,
          );
        });
    });

    it('should return members at period', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1/members')
        .query({ period: '2023-1' })
        .expect(200);

      expect(results.body).toEqual(
        mockData.getMembersAtPeriodData
          .slice(0, 2)
          .map((data) => ({ ...data, affiliationDate: expect.any(String) })),
      );
    });

    it('should return empty array', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1/members')
        .query({ period: '2022-2' })
        .expect(200);

      expect(results.body).toEqual([]);
    });

    it('should return 400 error', async () => {
      const results = await request(app.getHttpServer())
        .get('/api/seed-groups/1/members')
        .query({ period: 'test' })
        .expect(400);

      expect(results.body).toEqual({
        statusCode: 400,
        message: 'period must be in the format YYYY-X',
        error: 'Bad Request',
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
