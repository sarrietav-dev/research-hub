import { PrismaService } from '@/prisma/prisma.service';
import { CreateSeedGroupDto } from '@/seed-groups/controllers/schemas';
import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';

@Injectable()
export class SeedGroupRepositoryService {
  constructor(private prisma: PrismaService) {}

  async getSeedGroupById(id: number) {
    return await this.prisma.seedGroup.findUnique({
      where: {
        id,
      },
      include: {
        projects: { include: { certifyingOrganization: true, products: true } },
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
        member: true,
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
    return await this.prisma.seedGroup.findMany({
      include: {
        projects: { include: { certifyingOrganization: true, products: true } },
      },
    });
  }

  async getMembersAtPeriod(seedGroupId: number, period: string) {
    const data = await this.prisma.membershipRecord.findMany({
      where: {
        seedGroupId,
        period,
      },
      include: {
        member: true,
      },
    });

    return data;
  }

  async getProjectsBySeedGroupId(seedGroupId: number) {
    const data = await this.prisma.seedGroup.findUnique({
      where: {
        id: seedGroupId,
      },
      include: {
        projects: {
          include: {
            certifyingOrganization: true,
            products: true,
            members: { select: { id: true, name: true } },
          },
        },
      },
    });

    return data.projects;
  }

  async getEventsBySeedGroupId(seedGroupId: number) {
    return await this.prisma.event.findMany({
      where: {
        seedGroupId,
      },
    });
  }

  async getEventsByType(seedGroupId: number, type: $Enums.EventType) {
    return await this.prisma.event.findMany({
      where: {
        type,
        seedGroupId,
      },
    });
  }

  async createSeedGroup(seedGroup: CreateSeedGroupDto) {
    const { id } = await this.prisma.seedGroup.create({
      data: {
        program: {
          connect: {
            id: seedGroup.programId,
          },
        },
        name: seedGroup.name,
        description: seedGroup.description,
        acronym: seedGroup.acronym,
        creationDate: seedGroup.creationDate,
        researchLines: seedGroup.researchLines,
        coResearcherRecords: {
          createMany: {
            data: seedGroup.coResearchers.map((coResearcher) => ({
              coResearcherId: coResearcher.id,
              period: seedGroup.period,
            })),
          },
        },
        membershipRecords: {
          createMany: {
            data: seedGroup.members.map((member) => {
              return {
                affiliationDate: member.affiliationDate,
                functions: member.functions,
                isActive: member.isActive,
                roleId: member.roleId,
                period: seedGroup.period,
                memberId: member.memberId,
              };
            }),
          },
        },
        projects: {
          create: seedGroup.projects.map((project) => ({
            approvedAmount: project.approvedAmount,
            name: project.name,
            startDate: project.startDate,
            endDate: project.endDate,
            type: project.type,
            certifyingOrganization: {
              connect: {
                id: project.certifyingOrganizationId,
              },
            },
            members: {
              connect: project.members.map((member) => ({
                id: member.id,
              })),
            },
            products: {
              createMany: {
                data: project.products.map((product) => ({
                  name: product.name,
                  description: product.description,
                  date: product.date,
                  productTypeId: product.productTypeId,
                })),
              },
            },
          })),
        },
        researchGroup: {
          connect: {
            id: seedGroup.researchGroupId,
          },
        },
        leaderRecords: {
          create: {
            period: seedGroup.period,
            leaderId: seedGroup.leader.id,
          },
        },
        events: {
          create: seedGroup.events.map((event) => ({
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            type: event.type,
          })),
        },
      },
    });

    return id;
  }
}
