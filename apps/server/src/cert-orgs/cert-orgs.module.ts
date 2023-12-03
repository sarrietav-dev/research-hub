import { Module } from '@nestjs/common';
import { CertOrgsController } from './controllers/cert-orgs/cert-orgs.controller';
import { CertOrgsRepositoryService } from './services/cert-orgs-repository/cert-orgs-repository.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [CertOrgsController],
  providers: [CertOrgsRepositoryService, PrismaService],
})
export class CertOrgsModule {}
