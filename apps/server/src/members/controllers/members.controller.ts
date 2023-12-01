import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { MemberService } from '../services/member/member.service';

@Controller('api/members')
export class MembersController {
  constructor(private service: MemberService) {}

  @Get(':id')
  async getMemberById(@Param('id') id: string) {
    const idNumber = this.validateIdParam(id);
    return await this.service.getMemberById(idNumber);
  }

  @Get(':id/seed-groups')
  async getMembersSeedGroups(
    @Param('id') id: string,
    @Query('seedGroupId') seedGroupId: string,
  ) {
    const idNumber = this.validateIdParam(id);

    if (seedGroupId) {
      const seedGroupIdNumber = this.validateIdParam(seedGroupId);
      const record = await this.service.getMemberSeedGroupHistoryRecord(
        idNumber,
        seedGroupIdNumber,
      );

      if (record.length === 0) {
        throw new BadRequestException({
          statusCode: 404,
          message: 'No records found',
          error: 'Not found',
        });
      }

      return record;
    }

    return await this.service.getMembersSeedGroups(idNumber);
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
