import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from '@/members/services/person/person.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PersonRepositoryService } from '@/members/services/person-repository/person-repository.service';

describe('MembersController', () => {
  let controller: PersonController;

  const mockPrismaService = jest.mock('@/prisma/prisma.service');
  const mockMemberRepositoryService = jest.mock(
    '../services/person-repository/person-repository.service',
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        PersonService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: PersonRepositoryService,
          useValue: mockMemberRepositoryService,
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
