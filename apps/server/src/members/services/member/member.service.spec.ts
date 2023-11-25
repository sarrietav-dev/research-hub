import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberRepositoryService } from '../member-repository/member-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('MemberServiceService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService, MemberRepositoryService, PrismaService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
