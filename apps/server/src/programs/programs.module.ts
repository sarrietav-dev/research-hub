import { Module } from '@nestjs/common';
import { ProgramService } from './services/program/program.service';
import { ProgramRepositoryService } from './services/program-repository/program-repository.service';

@Module({
  providers: [ProgramService, ProgramRepositoryService]
})
export class ProgramsModule {}
