import { Module } from '@nestjs/common';
import { ProductRepositoryService } from './services/product-repository/product-repository.service';
import { ProductsController } from './controllers/products/products.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [ProductRepositoryService, PrismaService],
  controllers: [ProductsController],
})
export class ProductsModule {}
