import { Module } from '@nestjs/common';
import { SeedGroupService } from './service/seed-group/seed-group.service';
import { SeedGroupRepositoryService } from './service/seed-group-repository/seed-group-repository.service';
import { PrismaService } from '@/prisma/prisma.service';
import { SeedGroupsController } from './controllers/seed-groups.controller';

@Module({
  providers: [SeedGroupService, SeedGroupRepositoryService, PrismaService],
  controllers: [SeedGroupsController],
})
export class SeedGroupsModule {}
