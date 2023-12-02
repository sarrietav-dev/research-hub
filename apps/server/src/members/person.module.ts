import { Module } from '@nestjs/common';
import { PersonService } from '@/members/services/person/person.service';
import { PersonRepositoryService } from '@/members/services/person-repository/person-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PersonController } from './controllers/person.controller';

@Module({
  providers: [PersonService, PersonRepositoryService, PrismaService],
  controllers: [PersonController],
})
export class PersonModule {}
