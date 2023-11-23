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
  },
  {
    id: 2,
    name: 'Seed Group 2',
    programId: 1,
    acronym: 'SG2',
    description: 'Seed Group 2 Description',
    researchGroupId: 2,
    researchLines: ['Seed Group 2 Research Line 1'],
  },
  {
    id: 3,
    name: 'Seed Group 3',
    programId: 1,
    acronym: 'SG3',
    description: 'Seed Group 3 Description',
    researchGroupId: 3,
    researchLines: ['Seed Group 3 Research Line 1'],
  },
];
