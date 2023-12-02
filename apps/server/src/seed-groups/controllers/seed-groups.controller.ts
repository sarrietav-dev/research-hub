import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { SeedGroupService } from '../service/seed-group/seed-group.service';
import { $Enums } from '@prisma/client';
import {
  CreateProjectDto,
  CreateSeedGroupDto,
  createSeedGroupSchema,
} from './schemas';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';
@Controller('/api/seed-groups')
export class SeedGroupsController {
  constructor(private seedGroupService: SeedGroupService) {}

  @Post()
  @UsePipes(new ValidateInputPipe(createSeedGroupSchema))
  async createSeedGroup(@Body() seedGroup: CreateSeedGroupDto) {
    return await this.seedGroupService.createSeedGroup(seedGroup);
  }

  @Get(':id')
  async getSeedGroupById(@Param('id') id: string) {
    const seedGroupId = this.validateIdParam(id);

    const seedGroup = await this.seedGroupService.getSeedGroupById(seedGroupId);

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
  async getSeedGroups(@Query('programId') programIdQuery?: string) {
    if (programIdQuery) {
      const programId = this.validateIdParam(programIdQuery);

      return await this.seedGroupService.getSeedGroupsByProgram(programId);
    } else {
      return await this.seedGroupService.getSeedGroups();
    }
  }

  @Get(':id/members')
  async getMembers(@Param('id') id: string, @Query('period') period?: string) {
    const seedGroupId = this.validateIdParam(id);
    if (period) {
      if (!/^\d{4}-\d$/.test(period)) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'period must be in the format YYYY-X',
          error: 'Bad Request',
        });
      }

      const members = await this.seedGroupService.getMembersAtPeriod(
        seedGroupId,
        period,
      );

      return members;
    }

    const members = await this.seedGroupService.getLatestMembers(seedGroupId);

    if (!members) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    }

    return members;
  }

  @Get(':id/projects')
  async getProjects(@Param('id') idParam: string) {
    const id = this.validateIdParam(idParam);

    const projects = await this.seedGroupService.getProjects(id);

    if (!projects) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    }

    return projects;
  }

  @Get(':id/events')
  async getEvents(
    @Param('id') idParam: string,
    @Query('type') type?: $Enums.EventType,
  ) {
    const id = this.validateIdParam(idParam);

    if (type) {
      if (!Object.values($Enums.EventType).includes(type)) {
        throw new BadRequestException({
          statusCode: 400,
          message: `type must be one of ${Object.values($Enums.EventType).join(
            ', ',
          )}`,
          error: 'Bad Request',
        });
      }

      const events = await this.seedGroupService.getEventsByType(id, type);

      if (!events) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Seed Group not found',
          error: 'Not Found',
        });
      }

      return events;
    }

    const events = await this.seedGroupService.getEvents(id);

    if (!events) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Seed Group not found',
        error: 'Not Found',
      });
    }

    return events;
  }

  @Post(':id/projects')
  @UsePipes(new ValidateInputPipe(createSeedGroupSchema))
  async createProject(
    @Param('id') idParam: string,
    @Body() project: CreateProjectDto,
  ) {
    const id = this.validateIdParam(idParam);

    return await this.seedGroupService.createProject(id, project);
  }

  private validateIdParam(id: string) {
    if (isNaN(+id)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'id must be a number',
        error: 'Bad Request',
      });
    }

    return Number(id);
  }
}
