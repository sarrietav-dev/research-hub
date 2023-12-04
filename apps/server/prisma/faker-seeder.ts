import { $Enums, Prisma, PrismaClient } from '@prisma/client';
import faker from './faker';

const prismaClient = new PrismaClient();

const USER_SIZE = 10;
const RESEARCH_GROUP_SIZE = 30;
const CERT_ORG_SIZE = 4;
const PROGRAM_SIZE = 5;
const ROLE_SIZE = 2;
const TYPE_SIZE = 4;
const PERSON_SIZE = 300;
const EVENT_SIZE = 10;
const SEED_GROUP_SIZE = 50;
const PRODUCT_PER_PROJECT_SIZE = faker.number.int({ min: 1, max: 10 });
const CORESEARCHER_PER_SEEDGROUP_SIZE = 4;
const MEMBERSHIP_PER_SEEDGROUP_SIZE = 15;

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

function generateProductTypes() {
  let types: Prisma.ProductTypeCreateInput[] = [];

  for (let i = 0; i < 5; i++) {
    types = ['Artículo', 'Tesis', 'Informe', 'Afiches'].map((type) => ({
      name: type,
    }));
  }

  return types;
}

function generateProduct(
  size: number = 1,
  opt: { typeSize: number },
): Prisma.ProductCreateInput[] {
  const products: Prisma.ProductCreateInput[] = [];
  for (let i = 0; i < size; i++) {
    products.push({
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      type: {
        connect: { id: faker.number.int({ min: 1, max: opt.typeSize }) },
      },
      date: faker.date.past(),
      members: {
        connect: [...generateMemberConnection(5)],
      },
    });
  }
  return products;
}

function generateProject(
  size: number = 1,
  opts: { certOrgSize: number; memberSize: number },
): Prisma.ProjectUncheckedCreateWithoutSeedGroupInput[] {
  const projects: Prisma.ProjectUncheckedCreateWithoutSeedGroupInput[] = [];
  for (let i = 0; i < size; i++) {
    projects.push({
      name: faker.lorem.sentence(),
      approvedAmount: faker.number.int(),
      certifyingOrganizationId: faker.number.int({
        min: 1,
        max: opts.certOrgSize,
      }),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      type: faker.helpers.arrayElement<$Enums.ProjectStatus>([
        'Finished',
        'InProgress',
      ]),
      directorId: faker.number.int({ min: 1, max: PERSON_SIZE }),
      products: {
        create: generateProduct(PRODUCT_PER_PROJECT_SIZE, {
          typeSize: TYPE_SIZE,
        }),
      },
    });
  }
  return projects;
}

function generateMemberConnection(size = 1, opts?: { memberSize?: number }) {
  const connections: Prisma.PersonWhereUniqueInput[] = [];

  for (let i = 0; i < size; i++) {
    connections.push({
      id: faker.number.int({ min: 1, max: opts?.memberSize ?? PERSON_SIZE }),
    });
  }

  return connections;
}

function generateResearchGroup(
  size: number = 1,
): Prisma.ResearchGroupCreateManyInput[] {
  const researchGroups: Prisma.ResearchGroupCreateManyInput[] = [];
  for (let i = 0; i < size; i++) {
    researchGroups.push({
      name: faker.company.name(),
      programId: faker.number.int({ min: 1, max: PROGRAM_SIZE }),
    });
  }
  return researchGroups;
}

function generateCertifyingOrganization(): Prisma.CertifyingOrganizationCreateInput[] {
  return [
    { name: 'Universidad de Cartagena' },
    { name: 'Universidad Técnologica de Bolivar' },
    { name: 'Universidad de San Buenaventura' },
    { name: 'Universidad de Antioquia' },
  ];
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

function generatePerson(
  size: number = 1,
  opts: { programSize?: number },
): Prisma.PersonCreateManyInput[] {
  const members: Prisma.PersonCreateManyInput[] = [];
  for (let i = 0; i < size; i++) {
    members.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      identityCard: faker.number.bigInt().toString(),
      institutionalCode: faker.number.bigInt().toString(),
      phone: faker.phone.number(),
      programId: faker.number.int({ min: 1, max: opts.programSize }),
    });
  }
  return members;
}

function generateMembershipRoles(): Prisma.MembershipRoleCreateManyInput[] {
  return [{ name: 'Estudiante' }, { name: 'Profesor' }];
}

function generateMembershipRecord(
  size: number = 1,
  opts: {
    memberSize?: number;
    seedGroupId?: number;
    memberId?: number;
    roleSize?: number;
  },
): Prisma.MembershipRecordCreateManySeedGroupInput[] {
  const membershipRecords: Prisma.MembershipRecordCreateManyInput[] = [];

  for (let i = 0; i < size; i++) {
    membershipRecords.push({
      affiliationDate: faker.date.past(),
      functions: ['Función 1', 'Función 2'],
      isActive: faker.datatype.boolean(),
      period: faker.helpers.mustache('202{{year}}-{{period}}', {
        year: faker.number.int({ min: 2, max: 3 }).toString(),
        period: faker.helpers.arrayElement(['1', '2']),
      }),
      roleId: faker.number.int({ min: 1, max: opts.roleSize }),
      memberId: faker.number.int({ min: 1, max: opts.memberSize }),
    });
  }
  return membershipRecords;
}

function generateCoResearcherRecord(
  size: number = 1,
  opts?: { personsSize: number; seedGroupId: number },
): Prisma.CoResearcherRecordCreateManyInput[] {
  const coResearcherRecords: Prisma.CoResearcherRecordCreateManyInput[] = [];

  for (let i = 0; i < size; i++) {
    coResearcherRecords.push({
      coResearcherId: faker.number.int({ min: 1, max: opts?.personsSize ?? 5 }),
      period: faker.helpers.mustache('202{{year}}-{{period}}', {
        year: faker.number.int({ min: 2, max: 3 }).toString(),
        period: faker.helpers.arrayElement(['1', '2']),
      }),
      seedGroupId: opts?.seedGroupId,
    });
  }
  return coResearcherRecords;
}

function generatePrograms(): Prisma.ProgramCreateInput[] {
  return [
    { name: 'Ingeniería de Sistemas' },
    { name: 'Ingeniería Industrial' },
    { name: 'Ingeniería Electrónica' },
    { name: 'Ingeniería Mecánica' },
    { name: 'Ingeniería Ambiental' },
  ];
}

async function main() {
  await prismaClient.program.createMany({
    data: [...generatePrograms()],
  });
  await prismaClient.$transaction([
    prismaClient.person.createMany({
      data: [...generatePerson(PERSON_SIZE, { programSize: 5 })],
    }),

    prismaClient.user.createMany({
      data: [...generateUser(USER_SIZE)],
    }),

    prismaClient.researchGroup.createMany({
      data: [...generateResearchGroup(RESEARCH_GROUP_SIZE)],
    }),

    prismaClient.certifyingOrganization.createMany({
      data: [...generateCertifyingOrganization()],
    }),

    prismaClient.membershipRole.createMany({
      data: [...generateMembershipRoles()],
    }),

    prismaClient.productType.createMany({
      data: [...generateProductTypes()],
    }),
  ]);

  const sg = createSeedGroup(SEED_GROUP_SIZE);
  const promises = sg.map((seedGroup) =>
    prismaClient.seedGroup.create({
      data: seedGroup,
    }),
  );

  await prismaClient.$transaction(promises);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });

function createSeedGroup(size: number = 1) {
  const seedGroups: Prisma.SeedGroupCreateInput[] = [];

  for (let i = 0; i < size; i++) {
    seedGroups.push({
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      acronym: faker.lorem.word(),
      creationDate: faker.date.past(),
      leaderRecords: {
        create: {
          period: faker.helpers.mustache('202{{year}}-{{period}}', {
            year: faker.number.int({ min: 2, max: 3 }).toString(),
            period: faker.helpers.arrayElement(['1', '2']),
          }),
          leader: {
            connect: {
              id: faker.number.int({ min: 1, max: PERSON_SIZE }),
            },
          },
        },
      },
      membershipRecords: {
        createMany: {
          data: generateMembershipRecord(MEMBERSHIP_PER_SEEDGROUP_SIZE, {
            memberSize: PERSON_SIZE,
            roleSize: ROLE_SIZE,
          }),
        },
      },
      coResearcherRecords: {
        createMany: {
          data: generateCoResearcherRecord(CORESEARCHER_PER_SEEDGROUP_SIZE),
        },
      },
      program: {
        connect: {
          id: faker.number.int({ min: 1, max: PROGRAM_SIZE }),
        },
      },
      researchGroup: {
        connect: {
          id: faker.number.int({ min: 1, max: RESEARCH_GROUP_SIZE }),
        },
      },
      researchLines: ['Línea de investigación 1', 'Línea de investigación 2'],
      projects: {
        create: [
          ...generateProject(5, {
            certOrgSize: CERT_ORG_SIZE,
            memberSize: PERSON_SIZE,
          }),
        ],
      },
      events: {
        create: [...generateEvent(EVENT_SIZE)],
      },
    });
  }

  return seedGroups;
}
