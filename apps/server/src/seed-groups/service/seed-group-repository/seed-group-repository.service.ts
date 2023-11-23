import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedGroupRepositoryService {
  constructor(private prisma: PrismaService) {}

  async getSeedGroupsByProgramId(programId: number) {
    return this.prisma.seedGroup.findMany({
      where: {
        programId,
      },
    });
  }
}
