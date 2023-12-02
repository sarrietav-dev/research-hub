import { SeedGroupRepositoryService } from '../seed-group-repository/seed-group-repository.service';

export const getMembersAtPeriodData: Awaited<
  ReturnType<typeof SeedGroupRepositoryService.prototype.getMembersAtPeriod>
> = [];

export const getLatestMembersData: Awaited<
  ReturnType<
    typeof SeedGroupRepositoryService.prototype.getLatestMembersBySeedGroupId
  >
> = [];

export const getSeedGroupsByProgramData: Awaited<
  ReturnType<
    typeof SeedGroupRepositoryService.prototype.getSeedGroupsByProgramId
  >
> = [];

export const getProjectsData: Awaited<
  ReturnType<
    typeof SeedGroupRepositoryService.prototype.getProjectsBySeedGroupId
  >
> = [];

export const getEventsData: Awaited<
  ReturnType<typeof SeedGroupRepositoryService.prototype.getEventsBySeedGroupId>
> = [];
