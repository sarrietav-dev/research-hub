import { Injectable } from '@nestjs/common';
import { PersonRepositoryService } from '@/members/services/person-repository/person-repository.service';

@Injectable()
export class PersonService {
  constructor(private repo: PersonRepositoryService) {}

  async getMembersSeedGroups(id: number) {
    return await this.repo.getMembersSeedGroups(id);
  }

  async getMemberSeedGroupHistoryRecord(id: number, seedGroupId: number) {
    return await this.repo.getMemberSeedGroupHistoryRecord(id, seedGroupId);
  }
}
