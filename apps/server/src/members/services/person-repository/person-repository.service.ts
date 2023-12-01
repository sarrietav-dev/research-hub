import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonRepositoryService {
  constructor(private prisma: PrismaService) {}

  async getMembersSeedGroups(memberId: number) {
    return await this.prisma.membershipRecord.findMany({
      where: { memberId },
      select: {
        affiliationDate: true,
        functions: true,
        period: true,
        role: true,
        seedGroup: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async getMemberSeedGroupHistoryRecord(id: number, seedGroupId: number) {
    return await this.prisma.membershipRecord.findMany({
      where: {
        memberId: id,
        seedGroupId,
      },
      select: {
        affiliationDate: true,
        functions: true,
        period: true,
        role: true,
        seedGroup: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
