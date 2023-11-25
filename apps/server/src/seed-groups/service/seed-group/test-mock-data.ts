import { SeedGroupRepositoryService } from '../seed-group-repository/seed-group-repository.service';

export const getMembersAtPeriodData: Awaited<
  ReturnType<typeof SeedGroupRepositoryService.prototype.getMembersAtPeriod>
> = [
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 1,
    isActive: true,
    memberId: 1,
    period: '2023-1',
    seedGroupId: 1,
    role: 'Student',
    member: {
      id: 1,
      name: 'Member 1',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 2,
    isActive: true,
    memberId: 2,
    period: '2023-1',
    seedGroupId: 1,
    role: 'Professor',
    member: {
      id: 2,
      name: 'Member 2',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 3,
    isActive: true,
    memberId: 3,
    period: '2022-1',
    seedGroupId: 1,
    role: 'Student',
    member: {
      id: 3,
      name: 'Member 3',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 4,
    isActive: true,
    memberId: 4,
    period: '2022-1',
    seedGroupId: 1,
    role: 'Student',
    member: {
      id: 4,
      name: 'Member 4',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 5,
    isActive: true,
    memberId: 5,
    period: '2022-1',
    seedGroupId: 2,
    role: 'Student',
    member: {
      id: 5,
      name: 'Member 5',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 6,
    isActive: true,
    memberId: 6,
    period: '2022-1',
    seedGroupId: 2,
    role: 'Student',
    member: {
      id: 6,
      name: 'Member 6',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
];

export const getLatestMembersData: Awaited<
  ReturnType<
    typeof SeedGroupRepositoryService.prototype.getLatestMembersBySeedGroupId
  >
> = [
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 1,
    isActive: true,
    memberId: 1,
    period: '2023-1',
    seedGroupId: 1,
    role: 'Student',
    member: {
      id: 1,
      name: 'Member 1',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 2,
    isActive: true,
    memberId: 2,
    period: '2023-1',
    seedGroupId: 1,
    role: 'Professor',
    member: {
      id: 2,
      name: 'Member 2',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
  {
    affiliationDate: new Date(),
    functions: ['', '', ''],
    id: 3,
    isActive: true,
    memberId: 3,
    period: '2023-1',
    seedGroupId: 1,
    role: 'Student',
    member: {
      id: 3,
      name: 'Member 3',
      email: '',
      identityCard: '',
      institutionalCode: '',
    },
  },
];

export const getSeedGroupsByProgramData: Awaited<
  ReturnType<
    typeof SeedGroupRepositoryService.prototype.getSeedGroupsByProgramId
  >
> = [
  {
    id: 1,
    name: 'Seed Group 1',
    programId: 1,
    acronym: 'SG1',
    description: 'Seed Group 1 Description',
    researchGroupId: 1,
    researchLines: ['Seed Group 1 Research Line 1'],
    creationDate: new Date(),
  },
  {
    id: 2,
    name: 'Seed Group 2',
    programId: 1,
    acronym: 'SG2',
    description: 'Seed Group 2 Description',
    researchGroupId: 2,
    researchLines: ['Seed Group 2 Research Line 1'],
    creationDate: new Date(),
  },
  {
    id: 3,
    name: 'Seed Group 3',
    programId: 1,
    acronym: 'SG3',
    description: 'Seed Group 3 Description',
    researchGroupId: 3,
    researchLines: ['Seed Group 3 Research Line 1'],
    creationDate: new Date(),
  },
];

export const getProjectsData: Awaited<
  ReturnType<
    typeof SeedGroupRepositoryService.prototype.getProjectsBySeedGroupId
  >
> = [
  {
    id: 1,
    name: 'Project 1',
    approvedAmount: 1000,
    startDate: new Date(),
    endDate: new Date(),
    certifyingOrganizationId: 1,
    type: 'Finished',
    seedGroupId: 1,
    certifyingOrganization: {
      id: 1,
      name: 'Certifying Organization 1',
    },
    products: [
      {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 Description',
        projectId: 1,
        date: new Date(),
        type: 'Article',
      },
    ],
  },
  {
    id: 2,
    name: 'Project 2',
    approvedAmount: 2000,
    startDate: new Date(),
    endDate: new Date(),
    certifyingOrganizationId: 2,
    type: 'Finished',
    seedGroupId: 2,
    certifyingOrganization: {
      id: 2,
      name: 'Certifying Organization 2',
    },
    products: [
      {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 Description',
        projectId: 2,
        date: new Date(),
        type: 'Article',
      },
    ],
  },
  {
    id: 3,
    name: 'Project 3',
    approvedAmount: 3000,
    startDate: new Date(),
    endDate: new Date(),
    certifyingOrganizationId: 3,
    type: 'Finished',
    seedGroupId: 3,
    certifyingOrganization: {
      id: 3,
      name: 'Certifying Organization 3',
    },
    products: [
      {
        id: 3,
        name: 'Product 3',
        description: 'Product 3 Description',
        projectId: 3,
        date: new Date(),
        type: 'Article',
      },
    ],
  },
  {
    id: 4,
    name: 'Project 4',
    approvedAmount: 4000,
    startDate: new Date(),
    endDate: new Date(),
    certifyingOrganizationId: 4,
    type: 'Finished',
    seedGroupId: 4,
    certifyingOrganization: {
      id: 4,
      name: 'Certifying Organization 4',
    },
    products: [
      {
        id: 4,
        name: 'Product 4',
        description: 'Product 4 Description',
        projectId: 4,
        date: new Date(),
        type: 'Article',
      },
    ],
  },
];

export const getEventsData: Awaited<
  ReturnType<typeof SeedGroupRepositoryService.prototype.getEventsBySeedGroupId>
> = [
  {
    id: 1,
    description: 'Event 1',
    startDate: new Date(),
    endDate: new Date(),
    seedGroupId: 1,
    type: 'Local',
  },
  {
    id: 2,
    description: 'Event 2',
    startDate: new Date(),
    endDate: new Date(),
    seedGroupId: 2,
    type: 'Local',
  },
  {
    id: 3,
    description: 'Event 3',
    startDate: new Date(),
    endDate: new Date(),
    seedGroupId: 3,
    type: 'Local',
  },
  {
    id: 4,
    description: 'Event 4',
    startDate: new Date(),
    endDate: new Date(),
    seedGroupId: 4,
    type: 'Local',
  },
  {
    id: 5,
    description: 'Event 5',
    startDate: new Date(),
    endDate: new Date(),
    seedGroupId: 5,
    type: 'Local',
  },
  {
    id: 6,
    description: 'Event 6',
    startDate: new Date(),
    endDate: new Date(),
    seedGroupId: 6,
    type: 'Local',
  },
];
