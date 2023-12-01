import {
  BadRequestException, Body,
  Controller,
  Get,
  Param, Post,
  Query, UsePipes,
} from '@nestjs/common';
import {PersonService} from '@/members/services/person/person.service';
import {CreatePersonDto, CreatePersonSchema} from "@/members/controllers/schemas";
import {ValidateInputPipe} from "@/shared/validate-input/validate-input.pipe";

@Controller('api/person')
export class PersonController {
  constructor(private service: PersonService) {
  }

  @Get(':id')
  getPersonById(@Param('id') id: string) {
    const idNumber = this.validateIdParam(id);
    const record = this.service.getPersonById(idNumber);

    if (!record) {
      throw new BadRequestException({
        statusCode: 404,
        message: 'No records found',
        error: 'Not found',
      });
    }

    return record;
  }

  @Post()
  @UsePipes(new ValidateInputPipe(CreatePersonSchema))
  createPerson(@Body() personDto: CreatePersonDto) {
    return this.service.createPerson(personDto);
  }

  @Get(':id/products')
  async getPersonsProducts(@Param('id') id: string) {
    const idNumber = this.validateIdParam(id);
    const record = await this.service.getPersonsProducts(idNumber);

    if (!record) {
      throw new BadRequestException({
        statusCode: 404,
        message: 'No records found',
        error: 'Not found',
      });
    }

    return record;
  }

  @Get(':id/seed-groups')
  async getPersonsSeedGroups(
    @Param('id') id: string,
    @Query('seedGroupId') seedGroupId: string,
  ) {
    const idNumber = this.validateIdParam(id);

    if (seedGroupId) {
      const seedGroupIdNumber = this.validateIdParam(seedGroupId);
      const record = await this.service.getPersonSeedGroupHistoryRecord(
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

    return this.service.getPersonSeedGroups(idNumber);
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
