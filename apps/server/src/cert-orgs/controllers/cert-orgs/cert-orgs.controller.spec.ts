import { Test, TestingModule } from '@nestjs/testing';
import { CertOrgsController } from './cert-orgs.controller';

describe('CertOrgsController', () => {
  let controller: CertOrgsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertOrgsController],
    }).compile();

    controller = module.get<CertOrgsController>(CertOrgsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
