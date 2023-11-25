import { Test, TestingModule } from '@nestjs/testing';
import { MemberServiceService } from './member-service.service';

describe('MemberServiceService', () => {
  let service: MemberServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberServiceService],
    }).compile();

    service = module.get<MemberServiceService>(MemberServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
