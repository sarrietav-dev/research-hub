import { Test, TestingModule } from '@nestjs/testing';
import { MemberRepositoryService } from './member-repository.service';

describe('MemberRepositoryService', () => {
  let service: MemberRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberRepositoryService],
    }).compile();

    service = module.get<MemberRepositoryService>(MemberRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
