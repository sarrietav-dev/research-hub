import { ProductRepositoryService } from '@/products/services/product-repository/product-repository.service';
import { Controller, Get } from '@nestjs/common';

@Controller('api/products')
export class ProductsController {
  constructor(private repository: ProductRepositoryService) {}

  @Get('types')
  async getProductTypes() {
    return await this.repository.getProductTypes();
  }
}
