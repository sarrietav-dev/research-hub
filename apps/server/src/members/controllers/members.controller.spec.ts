import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MemberService } from '../services/member/member.service';
import { PrismaService } from '@/prisma/prisma.service';
import { MemberRepositoryService } from '../services/member-repository/member-repository.service';

describe('MembersController', () => {
  let controller: MembersController;

  const mockPrismaService = jest.mock('@/prisma/prisma.service');
  const mockMemberRepositoryService = jest.mock(
    '../services/member-repository/member-repository.service',
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        MemberService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: MemberRepositoryService,
          useValue: mockMemberRepositoryService,
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
