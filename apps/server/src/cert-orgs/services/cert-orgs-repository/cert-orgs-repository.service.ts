import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CertOrgsRepositoryService {
  constructor(private prisma: PrismaService) {}

  getCertOrgs() {
    return this.prisma.certifyingOrganization.findMany();
  }

  getCertOrgById(id: number) {
    return this.prisma.certifyingOrganization.findUnique({
      where: { id },
    });
  }

  createCertOrg(name: string) {
    return this.prisma.certifyingOrganization.create({
      data: { name },
    });
  }
}
