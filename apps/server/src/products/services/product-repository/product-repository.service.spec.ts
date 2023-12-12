import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepositoryService } from './product-repository.service';

describe('ProductRepositoryService', () => {
  let service: ProductRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepositoryService],
    }).compile();

    service = module.get<ProductRepositoryService>(ProductRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
