import { SeedGroupService } from '../service/seed-group/seed-group.service';

export const getMembersAtPeriodData: Awaited<
  ReturnType<typeof SeedGroupService.prototype.getMembersAtPeriod>
> = [];

export const getMembersData: Awaited<
  ReturnType<typeof SeedGroupService.prototype.getLatestMembers>
> = [];

export const getSeedGroupsData: Awaited<
  ReturnType<typeof SeedGroupService.prototype.getSeedGroups>
> = [];

export const getProjectsData: Awaited<
  ReturnType<typeof SeedGroupService.prototype.getProjects>
> = [];

export const getEventsData: Awaited<
  ReturnType<typeof SeedGroupService.prototype.getEvents>
> = [];
