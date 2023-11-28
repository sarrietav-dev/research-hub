/*
import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function createPrograms() {
  return await Promise.all([
    prismaClient.program.create({
      data: {
        name: 'Ingeniería de Alimentos',
      },
    }),
    prismaClient.program.create({
      data: {
        name: 'Ingeniería Ambiental',
      },
    }),
    prismaClient.program.create({
      data: {
        name: 'Ingeniería Industrial',
      },
    }),
    prismaClient.program.create({
      data: {
        name: 'Ingeniería de Sistemas',
      },
    }),
    prismaClient.program.create({
      data: {
        name: 'Ingeniería Civil',
      },
    }),
    prismaClient.program.create({
      data: {
        name: 'Ingeniería Electrónica',
      },
    }),
    prismaClient.program.create({
      data: {
        name: 'Ingeniería Mecánica',
      },
    }),
  ]);
}

async function main() {
  const { id: idCO } = await prismaClient.certifyingOrganization.create({
    data: { name: 'Universidad de Cartagena' },
  });
  const [
    { id: id1 },
    { id: id2 },
    { id: id3 },
    { id: id4 },
    { id: id5 },
    { id: id6 },
    { id: id7 },
  ] = await Promise.all([
    prismaClient.person.create({
      data: {
        name: 'Ricardo Andrés Solano Pizarro',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
        phone: faker.phone.number(),
        
      },
    }),
    prismaClient.member.create({
      data: {
        name: 'Udualdo Herrera García',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
      },
    }),
    prismaClient.member.create({
      data: {
        name: 'Alejandra Alexandra Reinemer Caparroso',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
      },
    }),
    prismaClient.member.create({
      data: {
        name: 'Juan Camilo Monterroza Rodriguez',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
      },
    }),
    prismaClient.member.create({
      data: {
        name: 'Carlos Alberto Rivero Simancas',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
      },
    }),
    prismaClient.member.create({
      data: {
        name: 'Marcos David Mora Montes',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
      },
    }),
    prismaClient.member.create({
      data: {
        name: 'Diana Marcela Quiroz López',
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
      },
    }),
  ]);

  const [{ id: id8 }, { id: id9 }, { id: id10 }] = await Promise.all([
    prismaClient.member.create({
      data: {
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
        name: 'Martha Cuenca',
      },
    }),
    prismaClient.member.create({
      data: {
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
        name: 'Angel Gonzales',
      },
    }),
    prismaClient.member.create({
      data: {
        email: faker.internet.email(),
        identityCard: faker.number.int().toString(),
        institutionalCode: faker.number.int().toString(),
        name: 'Adriana Herrera',
      },
    }),
  ]);

  await createPrograms();

  const program = await prismaClient.program.create({
    data: {
      name: 'Ingeniería Química',
    },
  });

  const coResearcher = await prismaClient.coResearcher.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      programId: program.id,
    },
  });

  await prismaClient.seedGroup.create({
    data: {
      name: 'Nanoworld',
      description: faker.lorem.paragraph(),
      creationDate: faker.date.past(),
      program: {
        connect: {
          id: program.id,
        },
      },
      leaderRecords: {
        create: {
          leader: {
            create: {
              name: faker.person.fullName(),
              email: faker.internet.email(),
              phone: faker.phone.number(),
            },
          },
        },
      },
      coResearcherRecords: {
        createMany: {
          data: [
            {
              coResearcherId: coResearcher.id,
            },
          ],
        },
      },
      researchGroup: {
        create: {
          name: 'Nanomateriales e Ingenieria de Procesos Asistida por Computador (NIPAC)',
        },
      },
      researchLines: ['Síntesis y caracterización de nanomateriales'],
      events: {
        create: [
          {
            description:
              'Síntesis y caracterización de nanopartículas por química verde.  Congreso internacional III SIMPOSIO TOXICOLOGÍA AMBIENTAL',
            startDate: new Date(Date.UTC(2019, 9)),
            type: 'Local',
          },
          {
            description:
              'Participación en 30 Congreso Colombiana de Ingeniería Química con cinco presentaciones tanto de afiches científicos como ponencias orales.',
            type: 'Local',
          },
          {
            description:
              'Preparation of magnetic sodium alginate-thiourea microbeads for removal of mercury.  XVI Congreso Internacional sobre Sostenibilidad Medioambiental, Cultural, Económica y Social.  Santiago - Chile.',
            startDate: new Date(Date.UTC(2020, 0, 29)),
            endDate: new Date(Date.UTC(2020, 0, 31)),
            type: 'International',
          },
          {
            description:
              'Preparación de carbón activado de residuos de ñame espino (dioscorea rotundata) modificado con magnetita para adsorción de pesticidas. X Congreso Internacional De Materiales CIM-2019.  Bucaramanga. International Meet on Material Science and Nanomaterials, 2021.',
            startDate: faker.date.past(),
            endDate: faker.date.past(),
            type: 'International',
          },
          {
            description:
              'Evaluación antimicrobial de una pintura modificada con nanopartículas de óxido de zinc (ZnO). XI Congreso Internacional de Materiales XI CIM 202',
            type: 'International',
            endDate: faker.date.past(),
            startDate: faker.date.past(),
          },
        ],
      },
      membershipRecords: {
        create: [
          {
            memberId: id1,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2017)),
            period: '2023-2',
            functions: ['Auxilires investigación(proyectos financiados)'],
          },
          {
            memberId: id2,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2015)),
            period: '2023-2',
            functions: ['Auxilires investigación(proyectos financiados)'],
          },
          {
            memberId: id3,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2022)),
            period: '2023-2',
            functions: ['Trabajos grado(tesis)'],
          },
          {
            memberId: id4,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2022)),
            period: '2023-2',
            functions: ['Trabajos grado(tesis)'],
          },
          {
            memberId: id5,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2022)),
            period: '2023-2',
            functions: ['Trabajos grado(tesis)'],
          },
          {
            memberId: id6,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2022)),
            period: '2023-2',
            functions: ['Etapa Metodológica investigación'],
          },
          {
            memberId: id7,
            role: 'Student',
            isActive: true,
            affiliationDate: new Date(Date.UTC(2022)),
            period: '2023-2',
            functions: ['Etapa Metodológica investigación'],
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Plan Fortalecimiento 2017',
            startDate: new Date(Date.UTC(2018, 1)),
            endDate: new Date(Date.UTC(2021, 9)),
            certifyingOrganizationId: idCO,
            approvedAmount: 30000000,
            type: 'Finished',
            products: {
              createMany: {
                data: getProducts(),
              },
            },
          },
          {
            name: 'Evaluación del uso de levaduras inmovilizadas utilizando alginato de calcio y nanomembranas de nylon en el proceso de fermentación alcohólica',
            startDate: new Date(Date.UTC(2018, 1)),
            endDate: new Date(Date.UTC(2021, 9)),
            certifyingOrganizationId: idCO,
            approvedAmount: 10000000,
            type: 'Finished',
            products: {
              createMany: {
                data: getProducts(),
              },
            },
          },
          {
            name: '"IMPLEMENTACION DE ENERGIA SOLAR EN LA POSTCOSECHA DEL CACAO (THEOBROMA CACAO L)DEL DEPARTAMENTO DE BOLIVAR',
            startDate: faker.date.past(),
            certifyingOrganizationId: idCO,
            approvedAmount: 35000000,
            type: 'InProgress',
            products: {
              createMany: {
                data: getProducts(),
              },
            },
            members: {
              connect: [
                {
                  id: id8,
                },
                {
                  id: id9,
                },
                {
                  id: id10,
                },
              ],
            },
          },
          {
            name: 'Desarrollo de filtros con propiedades antimicrobiales a partir de la impresión 3D de estructuras poliméricas modificadas con nanopartículas ecoamigables de lignina, celulosa y óxido de zinc',
            startDate: faker.date.past(),
            certifyingOrganizationId: idCO,
            approvedAmount: 35000000,
            type: 'InProgress',
            products: {
              createMany: {
                data: getProducts(),
              },
            },
            members: {
              connect: [
                {
                  id: id8,
                },
                {
                  id: id9,
                },
                {
                  id: id10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  function getProducts(): Prisma.ProductCreateWithoutProjectInput[] {
    return [
      {
        name: faker.lorem.sentence(),
        type: 'Article',
        date: faker.date.past(),
        description: faker.lorem.paragraph(),
      },
      {
        name: faker.lorem.sentence(),
        type: 'Thesis',
        date: faker.date.past(),
        description: faker.lorem.paragraph(),
      },
      {
        name: faker.lorem.sentence(),
        type: 'Report',
        date: faker.date.past(),
        description: faker.lorem.paragraph(),
      },
      {
        name: faker.lorem.sentence(),
        type: 'Poster',
        date: faker.date.past(),
        description: faker.lorem.paragraph(),
      },
    ];
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

  */
