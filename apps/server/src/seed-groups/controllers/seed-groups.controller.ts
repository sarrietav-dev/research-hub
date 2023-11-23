import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { SeedGroupService } from '../service/seed-group/seed-group.service';

@Controller('/api/seed-groups')
export class SeedGroupsController {
  constructor(private seedGroupService: SeedGroupService) {}

  @Get(':id')
  async getSeedGroupById(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'id must be a number',
        error: 'Bad Request',
      });
    }

    const seedGroup = await this.seedGroupService.getSeedGroupById(Number(id));

    if (!seedGroup) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    }

    return seedGroup;
  }

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

  @Get(':id/members')
  async getMembers(@Param('id') id: string, @Query('period') period?: string) {
    if (isNaN(+id)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'id must be a number',
        error: 'Bad Request',
      });
    }

    if (period) {
      if (!/^\d{4}-\d$/.test(period)) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'period must be in the format YYYY-X',
          error: 'Bad Request',
        });
      }

      const members = await this.seedGroupService.getMembersAtPeriod(
        Number(id),
        period,
      );

      return members;
    }

    const members = await this.seedGroupService.getLatestMembers(Number(id));

    if (!members) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    }

    return members;
  }
}
