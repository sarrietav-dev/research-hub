import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { SharedModule } from './shared/shared.module';
import { ProgramsModule } from './programs/programs.module';
import { SeedGroupsModule } from './seed-groups/seed-groups.module';

@Module({
  imports: [AuthModule, SharedModule, ProgramsModule, SeedGroupsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
