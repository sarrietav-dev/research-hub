import { Controller, Get, Query } from '@nestjs/common';
import { SeedGroupService } from '../service/seed-group/seed-group.service';

@Controller('/api/seed-groups')
export class SeedGroupsController {
  constructor(private seedGroupService: SeedGroupService) {}

  @Get()
  async getSeedGroups(@Query('programId') programId: number) {
    if (programId) {
      return await this.seedGroupService.getSeedGroupsByProgram(programId);
    } else {
      return await this.seedGroupService.getSeedGroups();
    }
  }
}
