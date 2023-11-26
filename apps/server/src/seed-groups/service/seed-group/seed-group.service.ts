import { Injectable } from '@nestjs/common';
import { SeedGroupRepositoryService } from '../seed-group-repository/seed-group-repository.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class SeedGroupService {
  constructor(private seedGroupRepository: SeedGroupRepositoryService) {}

  async getSeedGroupById(id: number) {
    return await this.seedGroupRepository.getSeedGroupById(id);
  }

  async getSeedGroupsByProgram(programId: number) {
    return await this.seedGroupRepository.getSeedGroupsByProgramId(programId);
  }

  async getSeedGroups() {
    return await this.seedGroupRepository.getSeedGroups();
  }

  async getLatestMembers(seedGroupId: number) {
    if (!(await this.seedGroupRepository.doesSeedGroupExist(seedGroupId))) {
      return null;
    }

    return await this.seedGroupRepository.getLatestMembersBySeedGroupId(
      seedGroupId,
    );
  }

  async getMembersAtPeriod(seedGroupId: number, period: string) {
    if (!(await this.seedGroupRepository.doesSeedGroupExist(seedGroupId))) {
      return null;
    }

    return await this.seedGroupRepository.getMembersAtPeriod(
      seedGroupId,
      period,
    );
  }

  async getProjects(seedGroupId: number) {
    if (!(await this.seedGroupRepository.doesSeedGroupExist(seedGroupId))) {
      return null;
    }

    return await this.seedGroupRepository.getProjectsBySeedGroupId(seedGroupId);
  }

  async getEvents(seedGroupId: number) {
    if (!(await this.seedGroupRepository.doesSeedGroupExist(seedGroupId))) {
      return null;
    }

    return await this.seedGroupRepository.getEventsBySeedGroupId(seedGroupId);
  }

  async getEventsByType(seedGroupId: number, eventType: $Enums.EventType) {
    if (!(await this.seedGroupRepository.doesSeedGroupExist(seedGroupId))) {
      return null;
    }

    return await this.seedGroupRepository.getEventsByType(
      seedGroupId,
      eventType,
    );
  }
}
