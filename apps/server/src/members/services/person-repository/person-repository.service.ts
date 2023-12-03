import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '@/members/controllers/schemas';

@Injectable()
export class PersonRepositoryService {
  constructor(private prisma: PrismaService) {}

  getPersonById(id: number) {
    return this.prisma.person.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identityCard: true,
        institutionalCode: true,
        program: true,
      },
    });
  }

  getPersonsProducts(id: number) {
    return this.prisma.person.findUnique({
      where: { id },
      select: {
        products: true,
      },
    });
  }

  getPersonsSeedGroups(id: number) {
    return this.prisma.membershipRecord.findMany({
      where: { memberId: id },
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

  getPersonSeedGroupHistoryRecord(id: number, seedGroupId: number) {
    return this.prisma.membershipRecord.findMany({
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

  createPerson(personDto: CreatePersonDto) {
    return this.prisma.person.create({
      data: {
        name: personDto.name,
        email: personDto.email,
        phone: personDto.phone,
        identityCard: personDto.identityCard,
        institutionalCode: personDto.institutionalCode,
        program: {
          connect: {
            id: personDto.programId,
          },
        },
      },
    });
  }

  async getPersons(query: string, take: number, skip: number) {
    const findMany = this.prisma.person.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            phone: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            identityCard: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            institutionalCode: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      take,
      skip,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        identityCard: true,
        institutionalCode: true,
        program: true,
      },
    });

    const countQuery = this.prisma.person.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            phone: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            identityCard: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            institutionalCode: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const [data, count] = await this.prisma.$transaction([
      findMany,
      countQuery,
    ]);

    return { data, count };
  }
}
