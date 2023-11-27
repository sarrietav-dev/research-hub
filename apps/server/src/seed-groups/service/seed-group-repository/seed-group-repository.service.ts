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

  async createSeedGroup(seedGroup: Required<CreateSeedGroupDto>) {
    return await this.prisma.seedGroup.create({
      data: {
        program: {
          connect: {
            id: seedGroup.programId,
          },
        },
        leaderRecords:
          seedGroup.leader.type === 'create'
            ? {
                create: {
                  leader: {
                    create: {
                      name: seedGroup.leader.name,
                      email: seedGroup.leader.email,
                      phone: seedGroup.leader.phone,
                    },
                  },
                },
              }
            : {
                connect: {
                  id: seedGroup.leader.id,
                },
              },
        membershipRecords: {
          create: seedGroup.members.map((member) => {
            if (member.type === 'create') {
              return {
                period: seedGroup.period!,
                affiliationDate: member.affiliationDate!,
                isActive: member.isActive!,
                role: member.role!,
                functions: member.functions!,
                member: {
                  create: {
                    email: member.email!,
                    name: member.name!,
                    identityCard: member.identityCard!,
                    institutionalCode: member.institutionalCode!,
                  },
                },
              };
            } else if (member.type === 'connect') {
              return {
                period: seedGroup.period!,
                affiliationDate: member.affiliationDate!,
                isActive: member.isActive!,
                role: member.role!,
                functions: member.functions!,
                memberId: member.memberId!,
              };
            }
          }),
        },
        coResearcherRecords: {
          create: seedGroup.coResearchers.map((coResearcher) => {
            if (coResearcher.type === 'create') {
              return {
                coResearcher: {
                  create: {
                    name: coResearcher.name,
                    email: coResearcher.email,
                    phone: coResearcher.phone,
                  },
                },
              };
            } else if (coResearcher.type === 'connect') {
              return {
                coResearcherId: coResearcher.id,
              };
            }
          }),
        },
        events: {
          create: seedGroup.events.map((event) => ({
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            type: event.type,
          })),
        },
        projects: {
          create: seedGroup.projects.map((project) => ({
            name: project.name,
            startDate: project.startDate,
            endDate: project.endDate,
            approvedAmount: project.approvedAmount,
            certifyingOrganization: {
              connect: {
                id: project.certifyingOrganizationId,
              },
            },
            type: project.type,
            members: null,
            products: {
              create: project.products.map((product) => ({
                name: product.name,
                description: product.description,
                date: product.date,
                type: product.type,
              })),
            },
          })),
        },
      },
    });
  }
}
