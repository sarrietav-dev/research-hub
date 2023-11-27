import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsController } from './programs.controller';
import { INestApplication } from '@nestjs/common';
import { ProgramService } from '../services/program/program.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ProgramRepositoryService } from '../services/program-repository/program-repository.service';
import * as request from 'supertest';

describe('ProgramsController', () => {
  let controller: ProgramsController;
  let service: ProgramService;
  let app: INestApplication;

  const mockPrismaService = jest.mock('@/prisma/prisma.service');
  const mockProgramRepositoryService = jest.mock(
    '../services/program-repository/program-repository.service',
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: ProgramRepositoryService,
          useValue: mockProgramRepositoryService,
        },
      ],
      controllers: [ProgramsController],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
    service = module.get<ProgramService>(ProgramService);

    module.useLogger(false);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#getPrograms', () => {
    it('should return an array of programs', async () => {
      const programs = [
        {
          id: 1,
          name: 'test',
        },
        {
          id: 2,
          name: 'test2',
        },
      ];

      jest.spyOn(service, 'getPrograms').mockResolvedValue(programs);

      await request(app.getHttpServer())
        .get('/api/programs')
        .expect(200)
        .expect(programs);
    });

    it('should return an empty array', async () => {
      jest.spyOn(service, 'getPrograms').mockResolvedValue([]);

      await request(app.getHttpServer())
        .get('/api/programs')
        .expect(200)
        .expect([]);
    });
  });

  describe('#getProgram', () => {
    it('should return a program', async () => {
      const program = {
        id: 1,
        name: 'test',
      };

      jest.spyOn(service, 'getProgramById').mockResolvedValue(program);

      await request(app.getHttpServer())
        .get('/api/programs/1')
        .expect(200)
        .expect(program);
    });

    it('should return a 404 error', async () => {
      jest.spyOn(service, 'getProgramById').mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/api/programs/1')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Program not found',
          error: 'Not Found',
        });
    });

    it('should return a 400 error', async () => {
      jest.spyOn(service, 'getProgramById').mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/api/programs/abc')
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Id must be a number',
          error: 'Bad Request',
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
