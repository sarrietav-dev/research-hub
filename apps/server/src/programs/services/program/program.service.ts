import { Injectable } from '@nestjs/common';
import { ProgramRepositoryService } from '../program-repository/program-repository.service';

@Injectable()
export class ProgramService {
  constructor(private programRepository: ProgramRepositoryService) {}

  getPrograms() {}

  getOneProgram() {}

  createProgram() {}

  updateProgram() {}

  deleteProgram() {}
}
