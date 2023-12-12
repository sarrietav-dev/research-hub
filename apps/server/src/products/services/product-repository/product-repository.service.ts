import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductTypes() {
    return await this.prisma.productType.findMany();
  }
}
