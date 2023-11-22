import { Module } from '@nestjs/common';
import { ProgramService } from './services/program/program.service';

@Module({
  providers: [ProgramService]
})
export class ProgramsModule {}
