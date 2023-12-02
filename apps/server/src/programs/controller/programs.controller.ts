import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ProgramService } from '../services/program/program.service';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';
import {
  CreateProgramDto,
  CreateProgramSchema,
} from '@/programs/controller/schema';

@Controller('/api/programs')
export class ProgramsController {
  constructor(private programService: ProgramService) {}

  @Get()
  async getPrograms() {
    return await this.programService.getPrograms();
  }

  @Post()
  @UsePipes(new ValidateInputPipe(CreateProgramSchema))
  createProgram(@Body() programDto: CreateProgramDto) {
    return this.programService.createProgram(programDto.name);
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
