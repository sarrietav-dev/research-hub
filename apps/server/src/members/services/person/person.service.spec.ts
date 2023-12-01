import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { PersonRepositoryService } from '@/members/services/person-repository/person-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('MemberServiceService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonService, PersonRepositoryService, PrismaService],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
