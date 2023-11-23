import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedGroupRepositoryService {
  constructor(private prisma: PrismaService) {}

  async getSeedGroupById(id: number) {
    return await this.prisma.seedGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async getSeedGroupsByProgramId(programId: number) {
    return await this.prisma.seedGroup.findMany({
      where: {
        programId,
      },
    });
  }

  async getLatestYearRegisteredBySeedGroupId(seedGroupId: number) {
    const data = await this.prisma.membershipRecord.aggregate({
      where: {
        seedGroupId,
      },
      _max: {
        period: true,
      },
    });

    return data._max.period;
  }

  async getLatestMembersBySeedGroupId(seedGroupId: number) {
    const data = await this.prisma.membershipRecord.findMany({
      where: {
        seedGroupId,
        period: await this.getLatestYearRegisteredBySeedGroupId(seedGroupId),
      },
      include: {
        Member: true,
      },
    });

    return data;
  }

  async doesSeedGroupExist(id: number) {
    const data = await this.prisma.seedGroup.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return data !== null;
  }

  async getSeedGroups() {
    return await this.prisma.seedGroup.findMany();
  }
}
