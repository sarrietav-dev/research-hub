import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PersonService } from '@/members/services/person/person.service';
import {
  CreatePersonDto,
  CreatePersonSchema,
} from '@/members/controllers/schemas';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';

@Controller('api/person')
export class PersonController {
  constructor(private service: PersonService) {}

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

  @Get()
  async getPersons(
    @Query('query') query: string = '',
    @Query('take') take: string = '10',
    @Query('page') page: string = '1',
  ) {
    if (!Number.isSafeInteger(+take) || !Number.isSafeInteger(+page)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'take and page must be integers',
        error: 'Bad Request',
      });
    }

    const takeNumber = Number(take);
    const pageNumber = Number(page);

    if (takeNumber < 1 || pageNumber < 1) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'take and page must be positive',
        error: 'Bad Request',
      });
    }

    return await this.service.getPersons(query, takeNumber, pageNumber);
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
  async getPersonsSeedGroups(@Param('id') id: string) {
    const idNumber = this.validateIdParam(id);

    return this.service.getPersonSeedGroups(idNumber);
  }

  @Get(':id/seed-groups/:seedGroupId')
  async getPersonSeedGroupHistoryRecord(
    @Param('id') id: string,
    @Param('seedGroupId') seedGroupId: string,
  ) {
    const idNumber = this.validateIdParam(id);
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
