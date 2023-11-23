import { Test, TestingModule } from '@nestjs/testing';
import { SeedGroupsController } from './seed-groups.controller';

describe('SeedGroupsController', () => {
  let controller: SeedGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedGroupsController],
    }).compile();

    controller = module.get<SeedGroupsController>(SeedGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
