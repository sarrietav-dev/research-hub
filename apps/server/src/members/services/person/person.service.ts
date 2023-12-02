import { Injectable } from '@nestjs/common';
import { PersonRepositoryService } from '@/members/services/person-repository/person-repository.service';
import { CreatePersonDto } from '@/members/controllers/schemas';

@Injectable()
export class PersonService {
  constructor(private repo: PersonRepositoryService) {}

  getPersonSeedGroups(id: number) {
    return this.repo.getPersonsSeedGroups(id);
  }

  getPersonSeedGroupHistoryRecord(id: number, seedGroupId: number) {
    return this.repo.getPersonSeedGroupHistoryRecord(id, seedGroupId);
  }

  getPersonById(id: number) {
    return this.repo.getPersonById(id);
  }

  getPersonsProducts(id: number) {
    return this.repo.getPersonsProducts(id);
  }

  createPerson(personDto: CreatePersonDto) {
    return this.repo.createPerson(personDto);
  }

  getPersons(query: string, take: number, page: number) {
    const skip = (page - 1) * take;

    return this.repo.getPersons(query, take, skip);
  }
}
