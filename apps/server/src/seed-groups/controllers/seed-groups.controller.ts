import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SeedGroupService } from '../service/seed-group/seed-group.service';

@Controller('/api/seed-groups')
export class SeedGroupsController {
  constructor(private seedGroupService: SeedGroupService) {}

  @Get()
  async getSeedGroups(@Query('programId') programId?: string) {
    if (programId) {
      if (isNaN(+programId)) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'programId must be a number',
          error: 'Bad Request',
        });
      }

      return await this.seedGroupService.getSeedGroupsByProgram(
        Number(programId),
      );
    } else {
      return await this.seedGroupService.getSeedGroups();
    }
  }
}
