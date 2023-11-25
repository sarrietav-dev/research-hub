import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
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
  async getMembersSeedGroups(@Param('id') id: string) {
    const idNumber = this.validateIdParam(id);
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
