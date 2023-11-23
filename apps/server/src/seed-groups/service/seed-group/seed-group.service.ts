import { Injectable } from '@nestjs/common';
import { SeedGroupRepositoryService } from '../seed-group-repository/seed-group-repository.service';

@Injectable()
export class SeedGroupService {
  constructor(private seedGroupRepository: SeedGroupRepositoryService) {}

  async getSeedGroupsByProgram(programId: number) {
    return await this.seedGroupRepository.getSeedGroupsByProgramId(programId);
  }

  async getSeedGroups() {
    return await this.seedGroupRepository.getSeedGroups();
  }
}
