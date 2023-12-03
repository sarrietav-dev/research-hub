import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CertOrgsRepositoryService } from '@/cert-orgs/services/cert-orgs-repository/cert-orgs-repository.service';
import {
  CreateCertOrgDto,
  CreateCertOrgSchema,
} from '@/cert-orgs/controllers/cert-orgs/schema';
import { ValidateInputPipe } from '@/shared/validate-input/validate-input.pipe';

@Controller('api/cert-orgs')
export class CertOrgsController {
  constructor(private repository: CertOrgsRepositoryService) {}

  @Get()
  getCertOrgs() {
    return this.repository.getCertOrgs();
  }

  @Get(':id')
  getCertOrgById(@Param('id') id: string) {
    return this.repository.getCertOrgById(Number(id));
  }

  @Post()
  @UsePipes(new ValidateInputPipe(CreateCertOrgSchema))
  createCertOrg(@Body() createCertOrgDto: CreateCertOrgDto) {
    return this.repository.createCertOrg(createCertOrgDto.name);
  }
}
