import { Test, TestingModule } from '@nestjs/testing';
import { CertOrgsRepositoryService } from './cert-orgs-repository.service';

describe('CertOrgsRepositoryService', () => {
  let service: CertOrgsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertOrgsRepositoryService],
    }).compile();

    service = module.get<CertOrgsRepositoryService>(CertOrgsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
