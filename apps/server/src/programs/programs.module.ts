import { Module } from '@nestjs/common';
import { ProgramService } from './services/program/program.service';
import { ProgramRepositoryService } from './services/program-repository/program-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [ProgramService, ProgramRepositoryService, PrismaService],
})
export class ProgramsModule {}
