import { Test, TestingModule } from '@nestjs/testing';
import { ProgramService } from './program.service';
import { ProgramRepositoryService } from '../program-repository/program-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Program } from '@/programs/domain/Program';

describe('ProgramService', () => {
  let service: ProgramService;
  let programRepository: ProgramRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramService, ProgramRepositoryService, PrismaService],
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

  describe('getPrograms', () => {
    it('should return an array of programs', async () => {
      const result: Program[] = [{ id: 1, name: 'test' }];
      jest
        .spyOn(programRepository, 'getPrograms')
        .mockImplementation(async () => result);

      expect(await service.getPrograms()).toBe(result);
    });

    it('should return an empty array', async () => {
      const result: Program[] = [];
      jest
        .spyOn(programRepository, 'getPrograms')
        .mockImplementation(async () => result);

      expect(await service.getPrograms()).toBe(result);
    });
  });

  describe('getProgramById', () => {
    it('should return a program', async () => {
      const result: Program = { id: 1, name: 'test' };
      jest
        .spyOn(programRepository, 'getProgramById')
        .mockImplementation(async () => result);

      expect(await service.getProgramById(1)).toBe(result);
    });

    it('should return null', async () => {
      const result: Program = null;
      jest
        .spyOn(programRepository, 'getProgramById')
        .mockImplementation(async () => result);

      expect(await service.getProgramById(1)).toBe(result);
    });
  });

  describe('createProgram', () => {
    it('should create a program', async () => {
      const result: Program = { id: 1, name: 'test' };
      jest
        .spyOn(programRepository, 'createProgram')
        .mockImplementation(async () => result);

      expect(await service.createProgram('test')).toBe(result);
    });
  });

  describe('updateProgram', () => {
    it('should update a program', async () => {
      const result: Program = { id: 1, name: 'test' };
      jest
        .spyOn(programRepository, 'updateProgram')
        .mockImplementation(async () => result);

      expect(await service.updateProgram(1, 'test')).toBe(result);
    });
  });

  describe('deleteProgram', () => {
    it('should delete a program', async () => {
      const result: Program = { id: 1, name: 'test' };
      jest
        .spyOn(programRepository, 'deleteProgram')
        .mockImplementation(async () => result);

      expect(await service.deleteProgram(1)).toBe(result);
    });

    it('should return null', async () => {
      const result: Program = null;
      jest
        .spyOn(programRepository, 'deleteProgram')
        .mockImplementation(async () => result);

      expect(await service.deleteProgram(1)).toBe(result);
    });
  });
});
