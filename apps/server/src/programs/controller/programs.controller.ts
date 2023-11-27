import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ProgramService } from '../services/program/program.service';

@Controller('/api/programs')
export class ProgramsController {
  constructor(private programService: ProgramService) {}

  @Get()
  async getPrograms() {
    return await this.programService.getPrograms();
  }

  @Get(':id')
  async getProgram(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Id must be a number',
      });
    }

    const program = await this.programService.getProgramById(Number(id));

    if (!program) {
      throw new NotFoundException({
        statusCode: 404,
        error: 'Not Found',
        message: 'Program not found',
      });
    }

    return program;
  }
}
