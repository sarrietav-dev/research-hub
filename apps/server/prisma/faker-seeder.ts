import { $Enums, Prisma, PrismaClient } from '@prisma/client';
import faker from './faker';

const prismaClient = new PrismaClient();

function generateUser(
  size: number = 1,
): { name: string; email: string; password: string }[] {
  const users: {
    name: string;
    email: string;
    password: string;
  }[] = [];
  for (let i = 0; i < size; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  return users;
}

function generateProduct(size: number = 1): Prisma.ProductCreateInput[] {
  const products: Prisma.ProductCreateInput[] = [];
  for (let i = 0; i < size; i++) {
    products.push({
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement<$Enums.ProductType>([
        'Thesis',
        'Other',
        'Article',
        'Poster',
        'Report',
      ]),
      date: faker.date.past(),
    });
  }
  return products;
}

function generateProject(
  size: number = 1,
  maxCertOrgIndex: number = 1,
): Prisma.ProjectUncheckedCreateWithoutSeedGroupInput[] {
  const projects: Prisma.ProjectUncheckedCreateWithoutSeedGroupInput[] = [];
  for (let i = 0; i < size; i++) {
    projects.push({
      name: faker.lorem.sentence(),
      approvedAmount: faker.number.int(),
      certifyingOrganizationId: faker.number.int({
        min: 1,
        max: maxCertOrgIndex,
      }),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      type: 'InProgress',
      products: {
        create: [...generateProduct(5)],
      },
      members: {
        connect: [
          ...generateMemberConnection(faker.number.int({ min: 1, max: 5 })),
        ],
      },
    });
  }
  return projects;
}

function generateMemberConnection(size = 1) {
  const connections: Prisma.MemberWhereUniqueInput[] = [];

  for (let i = 0; i < size; i++) {
    connections.push({
      id: faker.number.int({ min: 1, max: 5 }),
    });
  }

  return connections;
}

/**
 * Generates an array of certifying organizations or research groups.
 *
 * @param size The number of organizations or groups to generate. Default is 1.
 * @returns An array of certifying organizations or research groups.
 */
function generateCompany(
  size: number = 1,
):
  | Prisma.CertifyingOrganizationCreateManyInput[]
  | Prisma.ResearchGroupCreateManyInput[]
  | Prisma.ProgramCreateManyInput[] {
  const certOrgs:
    | Prisma.CertifyingOrganizationCreateManyInput[]
    | Prisma.ResearchGroupCreateManyInput
    | Prisma.ProductCreateManyInput = [];
  for (let i = 0; i < size; i++) {
    certOrgs.push({
      name: faker.company.name(),
    });
  }
  return certOrgs;
}

function generateEvent(
  size: number = 1,
): Prisma.EventCreateWithoutSeedGroupInput[] {
  const events: Prisma.EventCreateWithoutSeedGroupInput[] = [];
  for (let i = 0; i < size; i++) {
    events.push({
      type: faker.helpers.arrayElement<$Enums.EventType>([
        'International',
        'Local',
      ]),
      description: faker.lorem.paragraph(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
    });
  }
  return events;
}

function generateMember(size: number = 1): Prisma.MemberCreateInput[] {
  const members: Prisma.MemberCreateInput[] = [];
  for (let i = 0; i < size; i++) {
    members.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      identityCard: faker.number.bigInt().toString(),
      institutionalCode: faker.number.bigInt().toString(),
    });
  }
  return members;
}

async function generateMembershipRecord(
  size: number = 1,
): Promise<Prisma.MembershipRecordCreateManyInput[]> {
  const membershipRecords: Prisma.MembershipRecordCreateManyInput[] = [];

  for (let i = 0; i < size; i++) {
    const { id } = await prismaClient.member.create({
      data: generateMember()[0],
    });

    membershipRecords.push({
      memberId: id,
      affiliationDate: faker.date.past(),
      functions: ['Función 1', 'Función 2'],
      role: faker.helpers.arrayElement<$Enums.Role>(['Professor', 'Student']),
      isActive: faker.datatype.boolean(),
      period: faker.helpers.mustache('202{{year}}-{{period}}', {
        year: faker.number.int({ min: 0, max: 9 }).toString(),
        period: faker.helpers.arrayElement(['1', '2']),
      }),
    });
  }
  return membershipRecords;
}

function generateCoResearcher(
  size: number = 1,
): Prisma.CoResearcherCreateManyInput[] {
  const coResearchers: Prisma.CoResearcherCreateManyInput[] = [];
  for (let i = 0; i < size; i++) {
    coResearchers.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      programId: faker.number.int({ min: 1, max: 5 }),
    });
  }
  return coResearchers;
}

async function generateCoResearcherRecord(
  size: number = 1,
): Promise<Prisma.CoResearcherRecordCreateManyInput[]> {
  const coResearcherRecords: Prisma.CoResearcherRecordCreateManyInput[] = [];

  for (let i = 0; i < size; i++) {
    const { id } = await prismaClient.coResearcher.create({
      data: generateCoResearcher()[0],
    });

    coResearcherRecords.push({
      coResearcherId: id,
    });
  }
  return coResearcherRecords;
}

function generateLeader(): Prisma.LeaderCreateInput {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
  };
}

async function main() {
  await Promise.all([
    prismaClient.user.createMany({
      data: [...generateUser(5)],
    }),

    prismaClient.researchGroup.createMany({
      data: [...generateCompany(5)],
    }),

    prismaClient.program.createMany({
      data: [...generateCompany(5)],
    }),

    prismaClient.certifyingOrganization.createMany({
      data: [...generateCompany(5)],
    }),
  ]);

  await prismaClient.seedGroup.create({
    data: {
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      acronym: faker.lorem.word(),
      creationDate: new Date(),
      leaderRecords: {
        create: {
          leader: {
            create: generateLeader(),
          },
        },
      },
      membershipRecords: {
        create: [...(await generateMembershipRecord(5))],
      },
      coResearcherRecords: {
        create: [...(await generateCoResearcherRecord(5))],
      },
      program: {
        connect: {
          id: faker.number.int({ min: 1, max: 5 }),
        },
      },
      researchGroup: {
        connect: {
          id: faker.number.int({ min: 1, max: 5 }),
        },
      },
      researchLines: ['Línea de investigación 1', 'Línea de investigación 2'],
      projects: {
        create: [...generateProject(5, 5)],
      },
      events: {
        create: [...generateEvent(5)],
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });
